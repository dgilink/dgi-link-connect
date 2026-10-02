<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

## DGI Link operating rules

- `dgi-link-connect` is the source repository. This `dgi-link-connect-corporate-v2` worktree is for
  `feature/corporate-web-v2`.
- `dgilink.github.io` is a deploy artifact. Never edit it directly.
- Customer names are PRIVATE by default. Publish a DGI Realty customer case only after explicit,
  documented customer consent.
- Follow **One Task = One Writer** to avoid overlapping edits.
- Use the **No-New-Regression** lint policy: compare repo-wide lint counts with the recorded baseline,
  and require changed source files to pass lint and formatting checks.
- Push, production deployment, and DNS changes are **HARD GATE** actions requiring explicit approval.
- Use **Quiet Verification → Final Summary Only**. Run the full validation loop without streaming long
  logs to the user.
