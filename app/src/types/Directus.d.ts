export type DirectusUser = {
    id: string;
    first_name: string;
    last_name: string;
    email?: string;
    avatar: null | string | DirectusFile;
    password: "**********";
    location: null | string;
    title: null | string;
    description: null | string;
    tags: null | string;
    language: null | string;
    theme: null | string;
    tfa_secret: null | string;
    status: string;
    token: "**********";
    last_access: string | null;
    last_page: string;
    provider: string;
    external_identifier: string | null;
    auth_data: string | null;
    email_notifications: boolean;
    role: string;
 };

 
 export type DirectusFile = {
    id: string;
    storage: null | string;
    filename_disk: string;
    filename_download: string;
    title: null | string;
    type: null | string;
    folder: null | string;
    uploaded_by: null | string;
    uploaded_on: null | string;
    modified_by: null | string;
    modified_on: null | string;
    filesize: number;
    width: number;
    height: number;
    description: null;
    location: null;
    tags: string[];
    metadata:
       | null
       | any
       | {
            icc: {
               version: string;
               intent: string;
               cmm: string;
               deviceClass: string;
               colorSpace: string;
               connectionSpace: string;
               platform: string;
               creator: string;
               description: string;
               copyright: string;
            };
         };
 };