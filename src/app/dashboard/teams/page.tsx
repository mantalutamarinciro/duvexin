"use client"

import { useEffect, useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { PlusCircle, Trash2, UserPlus, Users, Loader2 } from "lucide-react"

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
import { useToast } from "@/hooks/use-toast"
import { createTeam, getTeams, Team } from "@/services/teamService"
import { Skeleton } from "@/components/ui/skeleton"

const teamMemberSchema = z.object({
  name: z.string().min(2, "Le nom du membre est requis."),
})

const teamSchema = z.object({
  name: z.string().min(3, "Le nom de l'équipe est requis."),
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
      members: [{ name: "" }],
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
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les équipes.",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTeams()
  }, [toast])

  async function onSubmit(values: z.infer<typeof teamSchema>) {
    setIsSubmitting(true)
    try {
      await createTeam(values)
      toast({
        title: "Équipe créée",
        description: `L'équipe "${values.name}" a été ajoutée avec succès.`,
      })
      form.reset({ name: "", members: [{ name: "" }] })
      loadTeams()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de création",
        description: "Impossible de créer l'équipe.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Gestion des équipes</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Créer une nouvelle équipe</CardTitle>
                  <CardDescription>
                    Ajoutez une nouvelle équipe et ses membres.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom de l'équipe</FormLabel>
                        <FormControl>
                          <Input placeholder="ex: Équipe Alpha" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <FormLabel>Membres de l'équipe</FormLabel>
                    <div className="mt-2 space-y-3">
                      {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2">
                          <FormField
                            control={form.control}
                            name={`members.${index}.name`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input placeholder={`Nom du membre ${index + 1}`} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                            disabled={fields.length <= 1}
                            className="text-muted-foreground hover:text-destructive"
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
                    size="sm"
                    onClick={() => append({ name: "" })}
                  >
                    <UserPlus className="mr-2" />
                    Ajouter un membre
                  </Button>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 animate-spin" />}
                    Créer l'équipe
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Équipes existantes</CardTitle>
              <CardDescription>Liste de toutes vos équipes de déménageurs.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {Array.from({length: 3}).map((_, i) => (
                     <div key={i} className="p-4 border rounded-lg">
                        <Skeleton className="h-6 w-1/2 mb-3" />
                        <div className="flex gap-2">
                           <Skeleton className="h-5 w-24 rounded-full" />
                           <Skeleton className="h-5 w-20 rounded-full" />
                        </div>
                     </div>
                  ))}
                </div>
              ) : teams.length > 0 ? (
                <div className="space-y-4">
                  {teams.map((team) => (
                    <div key={team.id} className="rounded-lg border p-4">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        {team.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">Membres de l'équipe :</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {team.members.map((member, index) => (
                          <span key={index} className="inline-block bg-secondary text-secondary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
                            {member.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="mx-auto h-12 w-12" />
                  <p className="mt-4 text-sm">Aucune équipe n'a encore été créée.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
