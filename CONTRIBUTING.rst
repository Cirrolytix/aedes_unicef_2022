Contributions
=============

Contributions are welcome and are greatly appreciated! Every little bit helps,
and credit will always be given.

This document aims to explain the subject of contributions if you have not contributed to any Open Source project, but it will also help people who have contributed to other projects learn about the rules of that community.

Types of Contributions

Report Bugs
-----------

Report bugs at `Github <https://github.com/cirrolytix/aedes_unicef_2022/issues>`__.
Please report relevant information and preferably code that exhibits the
problem. Kindly indicate the following when reporting:
* OS and Browser version
* Screenshots or error logs
* Steps in reproduction of the bug

Fix Bugs
Look through the GitHub issues for bugs. Anything is open to whoever wants to
implement it.

Submit Feedback
---------------

The best way to send feedback is to `open an issue on GitHub <https://github.com/cirrolytix/aedes_unicef_2022/issues/new/choose>`__.

If you are proposing a new feature:

-   Explain in detail how it would work.
-   Keep the scope as narrow as possible to make it easier to implement.
-   Remember that this is a volunteer-driven project, and that contributions are
    welcome :)

Contributors
------------

A contributor is anyone who wants to contribute code, documentation, tests, ideas, or anything to the
Project AEDES.

Contributors are responsible for:

* Fixing bugs
* Adding features

Preparing PR
------------------

1. Update the local sources to address the issue.

   For example, to address this example issue, do the following:

   * Make sure your fork's main is synced with Project AEDES's main before you create a branch.

   * Create a local branch for your development. Make sure to use latest
     ``aedes_unicef_2022/main`` as base for the branch. Note, some people develop their changes directly in their own
     ``main`` branches - this is OK and you can make PR from your main to ``aedes_unicef_2022/main`` but we
     recommend to always create a local branch for your development. This allows you to easily compare
     changes, have several changes that you work on at the same time and many more.
     If you have ``aedes_unicef_2022`` set as remote then you can make sure that you have latest changes in your main
     by ``git pull aedes_unicef_2022 main`` when you are in the local ``main`` branch. If you have conflicts and
     want to override your locally changed main you can override your local changes with
     ``git fetch aedes_unicef_2022; git reset --hard aedes_unicef_2022/main``.

   * Modify the class and add necessary code and unit tests.

   * Run the unit tests as you see fit.

   * Consider adding a newsfragment to your PR so you can add an entry in the release notes.
     The following newsfragment types are supported:

     * `significant`
     * `feature`
     * `improvement`
     * `bugfix`
     * `doc`
     * `misc`

2. Rebase your fork, squash commits, and resolve all conflicts. Remember to rebase often if your PR takes a lot of time to
   review/fix. This will make rebase process much easier and less painful and the more often you do it,
   the more comfortable you will feel doing it.

3. Re-run static code checks again.

4. Make sure your commit has a good title and description of the context of your change, enough
   for the committer reviewing it to understand why you are proposing a change. Make sure to follow other
   PR guidelines described in `pull request guidelines <#pull-request-guidelines>`_.
   Create Pull Request! Make yourself ready for the discussion!

5. Passing PR Review and PR Guidelines: PENDING

Improve Documentation
---------------------

Project AEDES could always use better documentation, whether as part of the official
Project AEDES docs, in docstrings, ``docs/*.rst`` or even on the web as blog posts or
articles.

Attribution
-----------

This contributing guidelines document was inspired by Apache Workflow's documentation.