# Make this site public (GitHub Pages)

Your project is ready to publish. You need to sign in to GitHub once.

## One-time setup

In Terminal:

```bash
cd "/Users/tianyuyue/.cursor/Computer Science/python-test-trainer"
gh auth login
```

Choose: GitHub.com → HTTPS → Login with browser.

## Create public repo and deploy

```bash
gh repo create ib-python-test-trainer --public --source=. --remote=origin --push
```

Then enable Pages:

```bash
gh api repos/{owner}/ib-python-test-trainer/pages -X POST -f build_type=workflow
```

Or in the browser: repo **Settings → Pages → Build and deployment → GitHub Actions**.

After the workflow runs (~1 min), your site is at:

**https://YOUR_GITHUB_USERNAME.github.io/ib-python-test-trainer/**

## Update later

```bash
git add -A && git commit -m "Update trainer" && git push
```

Pages redeploys automatically.
