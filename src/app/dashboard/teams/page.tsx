"use client"

import { useEffect, useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { PlusCircle, Trash2, UserPlus, Users, Loader2, HardHat, Truck, ShieldAlert, BadgeCheck, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { createTeam, getTeams, deleteTeam, Team, TeamMemberRole } from "@/services/teamService"
import { Skeleton } from "@/components/ui/skeleton"

const ROLES: TeamMemberRole[] = ["Chef d'équipe", "Chauffeur", "Déménageur"];

const teamMemberSchema = z.object({
  name: z.string().min(2, "Le nom est requis."),
  role: z.enum(["Chef d'équipe", "Chauffeur", "Déménageur"] as const),
})

const teamSchema = z.object({
  name: z.string().min(3, "Le nom de l'équipe est requis."),
  vehicleRegistration: z.string().optional(),
  members: z.array(teamMemberSchema).min(1, "Au moins un membre est requis."),
})

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof teamSchema>>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: "",
      vehicleRegistration: "",
      members: [{ name: "", role: "Déménageur" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "members",
  })

  const loadTeams = async () => {
    setLoading(true)
    try {
      const fetchedTeams = await getTeams()
      setTeams(fetchedTeams)
    } catch (error) {
      toast({ variant: "destructive", title: "Erreur", description: "Impossible de charger les équipes." })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTeams()
  }, [])

  async function onSubmit(values: z.infer<typeof teamSchema>) {
    setIsSubmitting(true)
    try {
      await createTeam(values)
      toast({ title: "Équipe créée ✨", description: `L'équipe "${values.name}" a été ajoutée avec succès.` })
      form.reset({ name: "", vehicleRegistration: "", members: [{ name: "", role: "Déménageur" }] })
      loadTeams()
    } catch (error) {
      toast({ variant: "destructive", title: "Erreur de création", description: "Impossible de créer l'équipe." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteTeam = async (id: string) => {
      try {
          await deleteTeam(id);
          toast({ title: "Équipe supprimée", description: "L'équipe a été retirée de la base de données." });
          loadTeams();
      } catch (error) {
          toast({ variant: 'destructive', title: "Erreur", description: "Impossible de supprimer l'équipe." });
      }
  }

  const totalMembers = teams.reduce((acc, team) => acc + team.members.length, 0);
  const totalVehicles = teams.filter(t => t.vehicleRegistration).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Opérationnel</h1>
            <p className="text-slate-500 mt-1">Gérez vos équipes, rôles et affectations de véhicules.</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
          <Card className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900 flex flex-col justify-center p-6">
              <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                      <Users className="h-6 w-6" />
                  </div>
                  <div>
                      <p className="text-sm font-medium text-slate-500">Équipes Actives</p>
                      <h3 className="text-3xl font-black">{teams.length}</h3>
                  </div>
              </div>
          </Card>
          <Card className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900 flex flex-col justify-center p-6">
              <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center">
                      <HardHat className="h-6 w-6" />
                  </div>
                  <div>
                      <p className="text-sm font-medium text-slate-500">Total Personnel</p>
                      <h3 className="text-3xl font-black">{totalMembers}</h3>
                  </div>
              </div>
          </Card>
          <Card className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900 flex flex-col justify-center p-6">
              <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center">
                      <Truck className="h-6 w-6" />
                  </div>
                  <div>
                      <p className="text-sm font-medium text-slate-500">Camions Assignés</p>
                      <h3 className="text-3xl font-black">{totalVehicles}</h3>
                  </div>
              </div>
          </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Colonne de Gauche : Création */}
        <div className="lg:col-span-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-primary/5 bg-white dark:bg-slate-900">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">Nouvelle équipe</CardTitle>
                  <CardDescription>
                    Créez une équipe, assignez un camion et définissez les rôles.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Nom de l'équipe</FormLabel>
                        <FormControl>
                          <Input className="rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-primary" placeholder="ex: Équipe Alpha" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vehicleRegistration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Camion Assigné <span className="text-slate-400 font-normal">(Optionnel)</span></FormLabel>
                        <FormControl>
                          <Input className="rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-primary uppercase" placeholder="ex: AB-123-CD" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <div className="flex items-center justify-between">
                        <FormLabel className="font-bold">Membres et Rôles</FormLabel>
                    </div>
                    <div className="mt-3 space-y-3">
                      {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-start bg-slate-50 dark:bg-slate-800 p-2 rounded-2xl border border-slate-100 dark:border-slate-700">
                            <div className="flex-1 space-y-2">
                                <FormField
                                    control={form.control}
                                    name={`members.${index}.name`}
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                        <Input className="h-8 text-sm rounded-lg border-white dark:border-slate-600 shadow-sm" placeholder="Nom complet" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`members.${index}.role`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-8 text-xs rounded-lg border-white dark:border-slate-600 shadow-sm">
                                                        <SelectValue placeholder="Rôle" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {ROLES.map(r => <SelectItem key={r} value={r} className="text-xs">{r}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(index)}
                                disabled={fields.length <= 1}
                                className="text-slate-400 hover:bg-red-100 hover:text-red-500 rounded-xl mt-1"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full rounded-xl border-dashed border-2"
                    onClick={() => append({ name: "", role: "Déménageur" })}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Ajouter un membre
                  </Button>
                </CardContent>
                <CardFooter className="bg-slate-50 dark:bg-slate-800/50 rounded-b-[2.5rem] p-6 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                  <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/20">
                    {isSubmitting ? <Loader2 className="mr-2 animate-spin" /> : <PlusCircle className="mr-2 h-5 w-5" />}
                    Enregistrer l'équipe
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>

        {/* Colonne de Droite : Liste */}
        <div className="lg:col-span-2">
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Array.from({length: 4}).map((_, i) => <Skeleton key={i} className="h-48 rounded-[2rem]" />)}
                </div>
            ) : teams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {teams.map((team) => (
                    <Card key={team.id} className="rounded-[2rem] border-none shadow-sm hover:shadow-md transition-all duration-300 relative group overflow-hidden bg-white dark:bg-slate-900">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full shadow-lg" onClick={() => handleDeleteTeam(team.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        <CardHeader className="pb-2 relative">
                            {/* Accent line depending on role presence */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                            
                            <div className="flex items-center gap-3 pt-2">
                                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                                    <Users className="h-6 w-6" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl">{team.name}</CardTitle>
                                    {team.vehicleRegistration ? (
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                                                <Truck className="h-3 w-3 text-slate-400" /> {team.vehicleRegistration}
                                            </span>
                                        </div>
                                    ) : (
                                        <p className="text-xs text-slate-400 italic mt-1">Aucun véhicule assigné</p>
                                    )}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="space-y-2">
                                {team.members.map((member, index) => (
                                    <div key={index} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                                        <span className="font-bold text-sm text-slate-700 dark:text-slate-200">{member.name}</span>
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md flex items-center gap-1.5
                                            ${member.role === "Chef d'équipe" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : 
                                              member.role === "Chauffeur" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300"}
                                        `}>
                                            {member.role === "Chef d'équipe" && <Shield className="h-3 w-3" />}
                                            {member.role === "Chauffeur" && <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" x2="12" y1="8" y2="12"/><line x1="3.95" x2="8.54" y1="6.06" y2="14"/><line x1="10.88" x2="15.46" y1="21.94" y2="14"/></svg>}
                                            {member.role === "Déménageur" && <HardHat className="h-3 w-3" />}
                                            {member.role}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    ))}
                </div>
            ) : (
                <Card className="rounded-[2rem] border-dashed border-2 flex flex-col items-center justify-center py-20 bg-transparent shadow-none">
                    <Users className="h-16 w-16 text-slate-300 mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Aucune équipe active</h3>
                    <p className="text-slate-500 mt-2 text-center max-w-sm">Utilisez le formulaire pour structurer vos ressources opérationnelles (chefs d'équipe, chauffeurs, camions).</p>
                </Card>
            )}
        </div>
      </div>
    </div>
  )
}
