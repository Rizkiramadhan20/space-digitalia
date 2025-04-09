// import { db } from './firebase';
// import { collection, onSnapshot } from 'firebase/firestore';

// type Project = {
//     title: string;
//     description?: string;
//     image?: string;
//     createdAt: Date;
// };

// type Article = {
//     title: string;
//     description?: string;
//     image?: string;
//     createdAt: Date;
//     slug: string;
// };

// export const subscribeToNewContent = (callback: (content: Project | Article) => void) => {
//     if (typeof window === 'undefined') return;

//     const notificationConsent = localStorage.getItem('notification_consent');
//     if (notificationConsent !== 'granted') return;

//     // Subscribe to new projects
//     onSnapshot(collection(db, 'projects'), (snapshot) => {
//         snapshot.docChanges().forEach((change) => {
//             if (change.type === 'added') {
//                 const project = change.doc.data() as Project;
//                 callback(project);

//                 if ('Notification' in window) {
//                     new Notification('Project Baru di Space Digitalia', {
//                         body: `Project baru telah ditambahkan: ${project.title}`,
//                         icon: '/favicon.ico',
//                     });
//                 }
//             }
//         });
//     });

//     // Subscribe to new articles
//     onSnapshot(collection(db, 'articles'), (snapshot) => {
//         snapshot.docChanges().forEach((change) => {
//             if (change.type === 'added') {
//                 const article = change.doc.data() as Article;
//                 callback(article);

//                 if ('Notification' in window) {
//                     new Notification('Artikel Baru di Space Digitalia', {
//                         body: `Artikel baru telah ditambahkan: ${article.title}`,
//                         icon: '/favicon.ico',
//                     });
//                 }
//             }
//         });
//     });
// };
