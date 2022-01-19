# Contributing

## Commit pattern:  
`[ADD] #1,#2 - Commit message.`  


### Commit Operation `[XXX]`  
Commit operation, must be one of the options:  
 

`[FIX]` -> Fix commit via HOTFIX in production.    
`[ADD]` -> Adding a feature or reference files.  
`[UPD]` -> Updating a feature or reference files.    
`[DEL]` -> Removing a feature or reference files.  
`[SYNC]` -> Utility commit when it is necessary to sync jobs.  
`[MERGE]` -> Merge commit, useful when it is necessary to merge between feature and development branch.  
`[RELEASE]` -> Version commit, used when development enters master.    
 
### HashTag do Commit deve ser o número da issue `#1,#2`  
A way to link commits with the issue.  

### Commit Message Separator ` - `  
Separator between commit metadata and message  

### Commit Message  
Descriptive message representing objectively and clearly the intent of that commit.  

### Contributing steps:  
1. Make a Fork!  
2. Create a feature branch: `git checkout -b dev-feature`  
3. Commit your changes according to our commit pattern: `git commit -m '[ADD] #1 - Commit message.'`  
4. Push code to cloud: `git push origin dev-feature`  

*Remember that we have a `pre-push` hook handling to avoid sending non-standard code.*


Make a Fork! a**Once your `pull request` is merged**, you can delete your problem branch.
