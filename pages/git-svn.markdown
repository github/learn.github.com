Does your IT staff mandate Subversion but you want to work in Git?  Hack on an open-source project that hasn't yet moved beyond Subversion?  Then git-svn, and by extension, this lesson, are for you.

Git and Subversion actually play fairly well together, provided you follow certain rules and guidelines.  The 'git svn' command provides two-way communication between a Git and Subversion repository.  This guide provides a brief overview of the general Subversion to Git to Subversion workflow.

### The git-svn Workflow ###

As described earlier, the general Git workflow is as follows:

* synchronize with upstream
* modify files
* see what you've changed
* stage the changes you want to commit
* commit your staging area
* rinse, repeat
* push upstream 

We'll address each of these actions, and how they are affected by git-svn, individually.

### Cloning a Subversion Repository ###

The first step is to actually clone a Subversion repository using Git.  In the most basic case, this is
accomplished by executing the following:

	$ git svn clone <subversion-url> ?optional-directory-name?
	
For example,

	$ git svn clone svn://localhost/MyRepository/trunk MyGitRepository

This will create a new Git repository in the directory named 'MyGitRepository', populate the Git history with all Subversion commits to the trunk, and checkout the latest HEAD.

Note that this operation _will_ take longer than a corresponding 'git clone' command, as the entire history for the Subversion repository in question must be downloaded, commit, by commit.  For large projects, this process can take hours.  Thus it's best to execute this command only when you have some time to kill.
