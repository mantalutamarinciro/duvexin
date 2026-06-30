'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Paramètres</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Préférences de l'application</CardTitle>
          <CardDescription>
            Personnalisez votre expérience sur le tableau de bord Déménagement du Vexin.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="flex items-center justify-between border-b pb-4">
            <div className="space-y-0.5">
              <Label className="text-base">Mode Sombre</Label>
              <p className="text-sm text-muted-foreground">
                Basculer entre le thème clair et le thème sombre.
              </p>
            </div>
            {mounted && (
              <Switch 
                checked={theme === 'dark'} 
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} 
              />
            )}
          </div>
          
          <div className="flex items-center justify-between border-b pb-4">
            <div className="space-y-0.5">
              <Label className="text-base">Notifications par e-mail</Label>
              <p className="text-sm text-muted-foreground">
                Recevez un e-mail à chaque nouvelle demande de devis.
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between pb-4">
            <div className="space-y-0.5">
              <Label className="text-base">Mises à jour automatiques</Label>
              <p className="text-sm text-muted-foreground">
                Synchroniser les données en arrière-plan.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Button className="w-full sm:w-auto mt-4">Sauvegarder les préférences</Button>
        </CardContent>
      </Card>
    </div>
  );
}
