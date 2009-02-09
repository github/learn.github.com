### changes that have not been staged ###

	$ git diff

### changes that are staged but not committed ###

	$ git diff --staged

### all changes since the last commit ###

	$ git diff HEAD
	
### how a file has changed since a specific time ###

	$ git diff v1.0 -- file.c

### changes between two commits ###

	$ git diff v1.0 v1.1

### what a merge would introduce ###

	$ git diff master...experiemnt
