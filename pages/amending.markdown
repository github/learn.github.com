From time to time you may write a commit message that doesn't make sense,
has a typo you want to fix or has left out some other information. Git
allows you to modify commit messages.

### warning ###

Refrain from editing commits that have already been pushed upstream to a 
remote or central server. Like rebasing, amending commits is changing 
history. Working alone, this is not a problem. If there are other people 
on the project, amending pushed commit messages will mess things up.

### changing the last commit message ###

If you want to modify your last commit message, run the following:

	$ git commit --amend

This will open up your text editor and allow you to change the last commit
message.

### changing multiple commit message ###

There may be times where you want to edit multiple commit messages, or 
to modify a commit message several commits back. In such cases, you need
to use a tool called "interactive rebase". 

You can run this with the `-i` flag option with `git rebase`. 
You will need to specify how far back you want to rewrite commits by telling
it which commit to go to.

If you want to change the last three commit messages, or any of the commit 
messages up to that point, add `HEAD~3` to the `git rebase -i` command.

	$ git rebase -i HEAD~3

Running the above command will give you a list of commits in your text editor
that looks something like this:

	pick dd56df4 so the reference updates
	pick 36c7dba updated ticgit gem
	pick 7482e0d updated the gemspec to hopefully work better

	# Rebase b429ad8..7482e0d onto b429ad8
	#
	# Commands:
	#  p, pick = use commit
	#  e, edit = use commit, but stop for amending
	#  s, squash = use commit, but meld into previous commit
	#
	# If you remove a line here THAT COMMIT WILL BE LOST.
	# However, if you remove everything, the rebase will be aborted.
	#

Replace the word "pick" with "edit" for each of the commit messages you want to 
change. For example, if you only want to change the third message
we would edit the file like this:

	pick dd56df4 so the reference updates
	pick 36c7dba updated ticgit gem
	edit 7482e0d updated the gemspec to hopefully work better
  
When you save and exit the editor, it will rewind you back to the last
commit in that list and drop you on the command line with the following 
message:


	$ git rebase -i HEAD~3
	Stopped at 7482e0d... updated the gemspec to hopefully work better
	You can amend the commit now, with

		git commit --amend

	Once you are satisfied with your changes, run

		git rebase --continue

These instructions tell you exactly what to do. Type the following:


	$ git commit --amend
 
Change the commit message and exit the editor. Then run:
 
	$ git rebase --continue
  
You can repeat these steps for each commit you changed to `edit`. Each time 
it will stop and let you amend the commit and continue when you're done. In 
this example, we had no other `edit`s so it will simply rebase the rest
of the commits. And we're done!