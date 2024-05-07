
/**
 * Data format of an Article from Database Table
 */
export interface Article
{
    id:number,
    date:string, 
    highlight:boolean,
    category:string,    
    issueDate:string,
    issue:string,
    shortHeadline:string,
    summary:string,
    rebuttal:string,
    completeArticle:string,
    source:string,
    subSources:string,
    refrenceUrl:string,
    attachment:string,
    notes:string,
    author:string,
    reviewed:boolean,
    reviewNotes:string,
    feedback:string
}