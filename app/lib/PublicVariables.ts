export class PublicVariables {
   static applicationBaseURL = process.env.NEXT_PUBLIC_APPLICATION_URL;
   static nextAuthTLL = Number(process.env.NEXT_PUBLIC_ACCESS_TOKEN_TTL_MS);
   static allowedFileTypes = ['image/png', 'image/jpeg']
}
