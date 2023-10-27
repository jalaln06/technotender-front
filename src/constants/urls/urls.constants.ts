export enum APP_URLS {
    AUTH = '/auth',

    // Equipment leasing person urls
    PUBLIC_TENDERS = '/tenders',
    VIEW_PUBLIC_TENDER = '/tenders/:id',
    SUBMISSION_SUCCESS = '/tenders/:id/submission-success',

    // Tender creator urls, he needs equipment
    MY_TENDERS = '/my-tenders',
    VIEW_MY_TENDER = '/my-tenders/:id',
    CREATE_TENDER = '/create-tender',
	EDIT_TENDER = '/edit-tender/:id',
}

export enum APP_URL_BLOCK {
    SUBMISSION_SUCCESS = 'submission-success',
}
