CURRENT = $(shell git rev-parse --short HEAD)

gh-pages:
	git checkout -b gh-pages-$(CURRENT)
	git add -f .
	git commit --allow-empty -m "Update gh-pages at $(CURRENT)"
	git push origin gh-pages-$(CURRENT):gh-pages --force
	git checkout -
	git branch -D gh-pages-$(CURRENT)

.PHONY: gh-pages
