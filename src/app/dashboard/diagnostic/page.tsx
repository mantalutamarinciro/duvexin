"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createTestData, getDbStatus } from '@/services/diagnosticService';
import { CheckCircle, AlertCircle, Database, FileText, Package, Users, Loader2, TestTube, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

interface DbStatus {
    status: 'connected' | 'error';
    message?: string;
    quotesCount?: number;
    bookingsCount?: number;
    teamsCount?: number;
}

export default function DiagnosticPage() {
    const [dbStatus, setDbStatus] = useState<DbStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [isCreatingData, setIsCreatingData] = useState(false);
    const { toast } = useToast();

    const checkStatus = async () => {
        setLoading(true);
        try {
            const status = await getDbStatus();
            setDbStatus(status);
        } catch (error) {
            setDbStatus({ status: 'error', message: (error as Error).message });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkStatus();
    }, []);

    const handleCreateData = async () => {
        setIsCreatingData(true);
        try {
            await createTestData();
            toast({
                title: 'Données de test créées',
                description: 'Une équipe et un devis de test ont été ajoutés.',
            });
            await checkStatus(); // Refresh counts
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Erreur',
                description: "Impossible de créer les données de test.",
            });
        } finally {
            setIsCreatingData(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="font-headline text-3xl font-bold tracking-tight">Diagnostic de l'application</h1>
                 <Button onClick={checkStatus} variant="outline" size="sm" disabled={loading}>
                    <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    Rafraîchir
                </Button>
            </div>
           
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Database />
                        Statut de la base de données (Firebase Firestore)
                    </CardTitle>
                    <CardDescription>
                        Vérifie la connexion à la base de données et affiche le nombre de documents dans chaque collection.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                               <Skeleton className="h-6 w-6 rounded-full" />
                               <Skeleton className="h-6 w-48" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-10">
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-20 w-full" />
                            </div>
                        </div>
                    ) : dbStatus?.status === 'connected' ? (
                        <div>
                            <div className="flex items-center text-green-600 font-semibold mb-4">
                                <CheckCircle className="mr-2" />
                                Connexion à Firestore réussie
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card className="bg-muted/50">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Devis</CardTitle>
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{dbStatus.quotesCount}</div>
                                    </CardContent>
                                </Card>
                                 <Card className="bg-muted/50">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Réservations</CardTitle>
                                        <Package className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{dbStatus.bookingsCount}</div>
                                    </CardContent>
                                </Card>
                                 <Card className="bg-muted/50">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Équipes</CardTitle>
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{dbStatus.teamsCount}</div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ) : (
                         <div className="flex items-start text-destructive font-semibold">
                            <AlertCircle className="mr-2 mt-1 flex-shrink-0" />
                            <div>
                                <p>Échec de la connexion à Firestore</p>
                                <p className="text-xs font-mono bg-destructive/10 p-2 rounded-md mt-2">{dbStatus?.message}</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TestTube />
                        Actions de Test
                    </CardTitle>
                    <CardDescription>
                        Utilisez ces actions pour peupler rapidement votre base de données avec des données de test.
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
