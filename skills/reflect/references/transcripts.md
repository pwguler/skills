# Transcripts

Each coding agent keeps the transcripts of its sessions in its own folder. Use the row of the agent that runs this session.

| Agent | Transcripts of this project | Current session |
|---|---|---|
| pi | the `.jsonl` files directly under `~/.pi/agent/sessions/--<path>--/` | `$PI_SESSION_FILE` |
| Claude Code | the `.jsonl` files directly under `~/.claude/projects/<project>/` | the newest file in that folder |
| Codex | the `rollout-*` files under `~/.codex/sessions/<year>/<month>/<day>/` that name this working directory | the newest such file |

- pi: `<path>` is the working directory without its leading `/`, with each `/` changed to `-`. When the `sessionDir` setting or `PI_CODING_AGENT_SESSION_DIR` is set, the sessions of every project are directly in that folder. Then keep the sessions whose first line, the `session` header, has this working directory as its `cwd`. The subdirectories hold subagent runs.
- Claude Code: `<project>` is the working directory, with `/` and other symbols changed to `-`. The subdirectories hold subagent runs. By default, the agent deletes transcripts after 30 days.
- Codex: `CODEX_HOME` replaces `~/.codex` when it is set. The first line of each file is a `session_meta` entry, and its `cwd` is the working directory. An older file can be compressed as `.jsonl.zst`. Read it with `zstd -dc`.
- Another agent: look for its transcripts in its folder in the home folder. When you find none, work from the conversation in your context, and say so.

Each line of a transcript is one JSON entry. The entries hold the turns of the user and the agent and the tool calls. Some entries hold summaries that the agent wrote.
