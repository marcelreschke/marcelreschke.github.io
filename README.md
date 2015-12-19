# UiKit-Sketching :snake::money_with_wings::bank:

HTML5 Sketching with UiKit

## Usage

Let's start NewProject using the UiKit-Sketching Framework as a starting point.


    $ git clone https://github.com/marcelreschke/uikit-sketching.git NewProject
    $ cd NewProject/

To push or pull updates to or from the Framework repository, add the repository as "upstream" and remove it as "origin".

    $ git remote add upstream https://github.com/marcelreschke/uikit-sketching.git
    $ git remote remove origin

Now we need a new remote origin repository. Therefor I create a bare repository in my Dropbox, add it and push it. Also I create a new branch upstream

    $ git init --bare ~/Dropbox/git/NewProject.git
    $ git remote add origin ~/Dropbox/git/NewProject.git
    $ git push origin master
    $ git branch upstream

Now we have our NewProject repository created with our bare copy of Uikit-Sketching committed and pushed up.

We start using Uikit-Sketching like this:

    $ npm install
    $ bower install
    $ gulp

## Updating Uikit-Sketching or NewProject

When we have changes in Uikit-Sketching that we want to fold back in to NewProject, we can do this:

    $ git checkout upstream
    $ git pull upstream master  
    $ git checkout master
    $ git merge upstream  

And if we have some changes to the framework that we want to go back to Uikit-Sketching:

    $ git log  
    # *find the sha of the commit we want*
    $ git checkout upstream  
    $ git cherrypick [sha of the commit we want]  
    $ git push upstream upstream:master  

**UiKit-Sketching** © 2014+, Marcel Resche, Dortmund, Germany. Released under the [MIT License].<br>
Authored and maintained by Marcel Reschke.

> [marcelreschke.com](http://marcelreschke.com) &nbsp;&middot;&nbsp;
> GitHub [@marcelreschke](https://github.com/marcelreschke) &nbsp;&middot;&nbsp;
> Twitter [@marcelreschke](https://twitter.com/marcelreschke)

[MIT License]: http://mit-license.org/
