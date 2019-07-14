export default class Reimbursment{
    reimbursementId: number; // primary key
    author: number;  // foreign key -> User, not null
    amount: number;  // not null
    dateSubmitted: number; // not null
    dateResolved: number;
    description: string; // not null
    resolver: number; // foreign key -> User
    status: number; // foreign ey -> ReimbursementStatus, not null
    type: number;
    constructor(obj){
        this.reimbursementId = obj.id;
        this.author = obj.author;
        this.amount = obj.ammount;
        this.dateSubmitted = obj.date_submitted;
        this.dateResolved = obj.date_resolved;
        this.description = obj.description;
        this.resolver = obj.resolver;
        this.status = obj.status;
        this.type = obj.reimbursement_type;
    }
}