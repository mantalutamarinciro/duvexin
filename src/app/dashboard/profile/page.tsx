'use client';

import { useUser, useAuth, useFirebaseApp } from "@/firebase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { user } = useUser();
  const auth = useAuth();
  const firebaseApp = useFirebaseApp();
  const { toast } = useToast();
  
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initials = user?.displayName 
    ? user.displayName.split(" ").map(n => n[0]).join("").toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || "U";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || !auth?.currentUser) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({ variant: 'destructive', title: "Fichier trop volumineux", description: "La taille maximale est de 5 Mo." });
      return;
    }

    try {
      setIsUploading(true);
      const storage = getStorage(firebaseApp);
      // On ajoute Date.now() pour forcer une nouvelle URL et éviter le cache du navigateur
      const storageRef = ref(storage, `profiles/${user.uid}/${Date.now()}_${file.name}`);
      
      const metadata = {
        contentType: file.type,
      };
      
      await uploadBytes(storageRef, file, metadata);
      const downloadURL = await getDownloadURL(storageRef);
      
      await updateProfile(auth.currentUser, {
        photoURL: downloadURL
      });

      toast({ title: "Photo de profil mise à jour", description: "Votre nouvelle photo de profil a été enregistrée avec succès. La page va se rafraîchir." });
      
      // Force le rechargement de la page pour mettre à jour le contexte utilisateur partout
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: "Erreur", description: "Impossible de mettre à jour la photo de profil." });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUpdateName = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const newName = formData.get("name") as string;
      if (!newName || !auth?.currentUser) return;
      try {
          setIsUpdatingName(true);
          await updateProfile(auth.currentUser, { displayName: newName });
          toast({ title: "Profil mis à jour", description: "Votre nom a été mis à jour avec succès. La page va se rafraîchir." });
          
          setTimeout(() => {
            window.location.reload();
          }, 1000);
      } catch (error) {
          toast({ variant: 'destructive', title: "Erreur", description: "Impossible de mettre à jour le profil." });
      } finally {
          setIsUpdatingName(false);
      }
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Mon Profil</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
          <CardDescription>
            Gérez vos informations de compte et votre profil public.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.photoURL || undefined} alt="Avatar" />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">{initials}</AvatarFallback>
            </Avatar>
            <div>
                <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                />
                <Button 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                >
                    {isUploading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Envoi...</> : "Changer la photo"}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">Format JPG, PNG ou GIF. Max 5 Mo.</p>
            </div>
          </div>
          
          <form onSubmit={handleUpdateName}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" name="name" defaultValue={user?.displayName || ""} placeholder="Votre nom" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse e-mail</Label>
                  <Input id="email" type="email" defaultValue={user?.email || ""} disabled />
                  <p className="text-[0.8rem] text-muted-foreground">Votre adresse e-mail est gérée par Firebase Auth.</p>
                </div>
              </div>
              <Button type="submit" disabled={isUpdatingName} className="w-full sm:w-auto mt-6">
                {isUpdatingName && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enregistrer les modifications
              </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
