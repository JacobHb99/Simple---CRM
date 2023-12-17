import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), importProvidersFrom(provideFirebaseApp(() => 
    initializeApp({
      "projectId":"simple-crm-2e197",
      "appId":"1:35174538162:web:46de66a79aad8765b3a2ab",
      "storageBucket":"simple-crm-2e197.appspot.com",
      "apiKey":"AIzaSyCOOu_Zdk7cnaVKfjLhXUWEes8KCIMykMo",
      "authDomain":"simple-crm-2e197.firebaseapp.com",
      "messagingSenderId":"35174538162"}))), 
      importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideDatabase(() => getDatabase())), importProvidersFrom(provideStorage(() => getStorage()))]
};
