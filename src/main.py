from pathlib import Path
from typing import Any
import sys

EXTENSIONS = ["tsx", "vue"]


def ends_with_array(str: str, substr: list[str]) -> bool:
    for x in substr:
        if str.endswith(x):
            return True
    return False


def process_file(file: Path):
    return ends_with_array(str(file), EXTENSIONS) and not ends_with_array(
        str(file), ["example.vue"]
    )


FILES = sorted(Path("./components").glob("**/*.*"))
FILES = list(filter(process_file, FILES))


def process_js_object_field(item: str) -> tuple[str, Any]:
    [key, value] = item.strip().split(":")
    value = value.strip()
    if value == "true":
        value = True
    elif value == "false":
        value = False
    else:
        value = eval(value)
    return (key.strip(), value)


def get_metadata(path: Path) -> dict:
    start = False
    stop = False
    lines = ""
    result = {}
    for line in path.read_text().splitlines():
        if stop:
            lines = lines.strip()
            break
        if "export const METADATA" in line:
            start = True
        if start:
            lines += line + "\n"
        stop = start and "}" in line
    startIndex = lines.find("{") + 1
    endIndex = lines.find("}")
    for item in lines[startIndex:endIndex].strip().split(","):
        if not ":" in item:
            continue
        [key, value] = process_js_object_field(item)
        result[key] = value
    return result


def replace_marker(marker: str, replace_with: str, template: list[str]):
    idx = next(idx for [idx, line] in enumerate(template) if marker in line)
    template[idx + 1] = replace_with


def get_template(name: str) -> list[str]:
    return Path(f"./layouts/Template@{name}.astro").read_text().splitlines()


def main():
    for file in FILES:
        metadata = get_metadata(file)
        if metadata["styled"]:
            route = f'{metadata["designSystem"]}/{metadata["type"]}/{metadata["framework"]}/{metadata["styleProcessor"]}/{"typescript" if metadata["typescript"] else "javascript"}'
        else:
            route = f'unstyled/{metadata["type"]}/{metadata["framework"]}/{"typescript" if metadata["typescript"] else "javascript"}'

        updir = len(route.split("/")) + 1  # 1 for pages and 1 because path is n(/) + 1
        fullpath = "../" * updir + str(file)
        [basepath, _, ext] = fullpath.rpartition(".")
        TEMPLATE = get_template(metadata["framework"])
        replace_marker(
            "@import",
            f"import {{Example, METADATA}} from '{basepath if ext in ['tsx'] else fullpath}'",
            TEMPLATE,
        )
        replace_marker("@fullpath", f"const FULLPATH = '{fullpath}'", TEMPLATE)
        replace_marker(
            "@globaltypes",
            f"const globalTypes = Object.values( await import.meta.glob('{'../' * updir}global.d.ts', {{ eager: true, as: 'raw', }}))[0] as string",
            TEMPLATE,
        )
        replace_marker(
            "@rawfilecontents",
            f"const rawFileContents = await import.meta.glob('{'../'*updir}components/**/*.({'|'.join(EXTENSIONS + ['.css'])})', {{ as: 'raw' }})",
            TEMPLATE,
        )
        routePath = Path(f"pages/{route}")
        routePath.mkdir(exist_ok=True, parents=True)
        (routePath / "index.astro").write_text("\n".join(TEMPLATE))


if __name__ == "__main__":
    main()
