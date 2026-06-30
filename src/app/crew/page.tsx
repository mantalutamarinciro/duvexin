import { getTeams } from "@/services/teamService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HardHat, ChevronRight } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function CrewHomePage() {
    const teams = await getTeams();

    return (
        <div className="w-full max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Sélection de l'équipe</CardTitle>
                    <CardDescription>Choisissez votre équipe pour voir votre planning de déménagements.</CardDescription>
                </CardHeader>
                <CardContent>
                    {teams.length > 0 ? (
                        <div className="space-y-3">
                            {teams.map(team => (
                                <Button asChild key={team.id} variant="outline" className="w-full justify-between h-14">
                                    <Link href={`/crew/${team.id}`}>
                                        <div className="flex items-center gap-4">
                                            <HardHat className="h-6 w-6 text-primary" />
                                            <span className="text-lg font-semibold">{team.name}</span>
                                        </div>
                                        <ChevronRight />
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-muted-foreground py-8">Aucune équipe n'a été créée.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
