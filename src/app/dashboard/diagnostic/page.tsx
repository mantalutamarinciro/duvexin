"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createTestData, getDbStatus } from "@/services/diagnosticService";
import {
  CheckCircle,
  AlertCircle,
  Database,
  Loader2,
  TestTube,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

type DiagnosticDbStatus = Awaited<ReturnType<typeof getDbStatus>>;

export default function DiagnosticPage() {
  const [dbStatus, setDbStatus] = useState<DiagnosticDbStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCreatingData, setIsCreatingData] = useState(false);
  const { toast } = useToast();

  const checkStatus = async () => {
    setLoading(true);
    try {
      const status = await getDbStatus();
      setDbStatus(status);
    } catch (error) {
      setDbStatus({
        ok: false,
        firestore: false,
        message: (error as Error).message || "Erreur inconnue.",
        checkedAt: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void checkStatus();
  }, []);

  const handleCreateData = async () => {
    setIsCreatingData(true);
    try {
      await createTestData();
      toast({
        title: "Données de test créées",
        description: "Une équipe et un devis de test ont été ajoutés.",
      });
      await checkStatus();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de créer les données de test.",
      });
    } finally {
      setIsCreatingData(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Diagnostic de l'application
        </h1>

        <Button onClick={checkStatus} variant="outline" size="sm" disabled={loading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Rafraîchir
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Statut de la base de données (Firebase Firestore)
          </CardTitle>
          <CardDescription>
            Vérifie la connexion à la base de données Firebase.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-6 w-56" />
              </div>
              <Skeleton className="h-24 w-full rounded-xl" />
            </div>
          ) : dbStatus?.ok ? (
            <div className="space-y-4">
              <div className="flex items-center font-semibold text-green-600">
                <CheckCircle className="mr-2 h-5 w-5" />
                Connexion à Firestore réussie
              </div>

              <Card className="bg-muted/40">
                <CardContent className="pt-6">
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-semibold">Message :</span>{" "}
                      {dbStatus.message}
                    </p>
                    <p>
                      <span className="font-semibold">Firestore :</span>{" "}
                      {dbStatus.firestore ? "OK" : "Erreur"}
                    </p>
                    <p>
                      <span className="font-semibold">Dernière vérification :</span>{" "}
                      {dbStatus.checkedAt
                        ? format(new Date(dbStatus.checkedAt), "PPpp", { locale: fr })
                        : "-"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex items-start font-semibold text-destructive">
              <AlertCircle className="mr-2 mt-1 h-5 w-5 flex-shrink-0" />
              <div>
                <p>Échec de la connexion à Firestore</p>
                <p className="mt-2 rounded-md bg-destructive/10 p-2 text-xs font-mono">
                  {dbStatus?.message || "Erreur inconnue"}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5" />
            Actions de test
          </CardTitle>
          <CardDescription>
            Utilisez ces actions pour peupler rapidement votre base de données avec
            des données de test.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button onClick={handleCreateData} disabled={isCreatingData}>
            {isCreatingData ? <Loader2 className="mr-2 animate-spin" /> : null}
            Créer une équipe et un devis de test
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
