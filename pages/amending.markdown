<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

	<title>Changing Git History</title>
	
	<style type="text/css">
		html { font-family: "helvetica"; color: #333; }
		body {
  		margin-top: 1.5em;
    }
    #container {
      margin: 0 auto;
      width: 800px;
    }
		h1 { font-size: 2.5em; color: #666; }
		h2 { font-size: 1.5em; color: #111; }
		pre { background-color: #eee; margin: 10px; padding: 15px;}
		.hl { background: #ee8; }
	</style>
	
</head>

<body>
  
  <div id="container">

    <h1>Changing Your Commit Messages</h1>

    This document describes how to modify commit messages in Git after the fact.

    <h2>Changing the Last Commit Message</h2>
    
    <p>
      If you only want to modify your last commit message, it is very simple.
      Just run
    </p>
    
    <pre>$ git commit --amend</pre>
    
    <p>
      That will drop you into your text exitor and let you change the last
      commit message.
    </p>

    <h2>Changing Multiple Commit Messages</h2>
    
    <p>
      Now let's assume that you want to modify either multiple commit messages,
      or a commit message several commits back.  In this case, you need to use
      a tool called 'interactive rebase'.  You can run this with the <em>-i</em>
      option to <code>git rebase</code>.  You will need to supply how far back you 
      want to rewrite commits by telling it which commit to go back to.
    </p>
    
    <p>  
      If you want to change the last 3 commit messages, or any of the commit 
      messages up to that point, supply 'HEAD~3' to the <code>git rebase -i</code>
      command.
    </p>
    
    <pre>$ git rebase -i HEAD~3</pre>
      
    <div class="warning">Warning: every commit you see in this list will be 
      re-written, whether you change the message or not.  Do not include any
      commit you have already pushed to a central server - it will mess other 
      people up.
    </div>
    
    <p>
      Running this command will give you a list of commits in your text editor
      that looks something like this:
    </p>
    
    <pre>pick dd56df4 so the reference updates
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
</pre>

  <p>Change the word 'pick' to the work 'edit' for each of the commits you 
    want to change the message for.  For example, let's say we want to change
    the third commit message only, we would change the file to look like this
  </p>
  
      <pre>pick dd56df4 so the reference updates
pick 36c7dba updated ticgit gem
<span class="hl">edit</span> 7482e0d updated the gemspec to hopefully work better</pre>
  
  <p>
    When you save and exit the editor, it will rewind you back to that last
    commit in that list and drop you on the command line with the following
    message:
  </p>
  
  <pre>$ git rebase -i HEAD~3
Stopped at 7482e0d... updated the gemspec to hopefully work better
You can amend the commit now, with

	git commit --amend

Once you are satisfied with your changes, run

	git rebase --continue
</pre>

  <p>These instructions tell you exactly what to do.  Type</p>
  
  <pre>$ git commit --amend</pre>
  
  <p>Change the commit message and exit the editor.  Then run</p>
  
  <pre>$ git rebase --continue</pre>
  
  <p>
    You can repeat those steps for each commit you changed to <code>edit</code>.
    Each time it will stop and let you amend the commit and continue when you're 
    done.  In this case, we had no other 'edit's so it will simply rebase the rest
    of the commits and we're done!
  </p>

</body>
</html>
