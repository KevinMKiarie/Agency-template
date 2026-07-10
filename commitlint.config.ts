import type { UserConfig } from "@commitlint/types"

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // new feature or section
        "fix", // bug fix
        "chore", // maintenance, deps
        "style", // CSS, design tweaks
        "refactor", // code restructure
        "perf", // performance
        "docs", // documentation
        "test", // tests
        "ci", // pipeline changes
        "revert", // reverting a commit
      ],
    ],
    "subject-case": [2, "always", "lower-case"],
    "subject-max-length": [2, "always", 72],
    "body-max-line-length": [2, "always", 100],
  },
}

export default config
