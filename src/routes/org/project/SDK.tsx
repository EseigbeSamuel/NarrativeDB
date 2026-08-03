import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HugeiconsIcon } from '@hugeicons/react'
import { Copy01Icon } from '@hugeicons/core-free-icons'

export const Route = createFileRoute('/org/project/SDK')({
  component: SDKPage,
})

function SDKPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 overflow-y-auto">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">SDK & API</h2>
          <p className="text-muted-foreground">Connect your game engine to NarrativeDB.</p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle>API Credentials</CardTitle>
            <CardDescription>Use these keys to authenticate your game client.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Project ID</label>
              <div className="flex space-x-2">
                <Input value="prj_8f92j10x84n" readOnly className="font-mono bg-secondary/50" />
                <Button variant="outline" size="icon">
                  <HugeiconsIcon icon={Copy01Icon} className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Public Key (Read-Only)</label>
              <div className="flex space-x-2">
                <Input value="pk_test_1234567890abcdef" readOnly className="font-mono bg-secondary/50" />
                <Button variant="outline" size="icon">
                  <HugeiconsIcon icon={Copy01Icon} className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-red-400">Secret Key (Server-Side Only)</label>
              <div className="flex space-x-2">
                <Input value="***************************" readOnly className="font-mono bg-secondary/50" type="password" />
                <Button variant="outline">Reveal</Button>
              </div>
              <p className="text-xs text-muted-foreground">Never expose this key in client-side game code.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
            <CardDescription>Install the SDK for your engine.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Unity (C#)</h3>
              <div className="bg-[#1e1e1e] p-3 rounded-md border border-[#333]">
                <code className="text-xs text-green-400 font-mono">
                  await NarrativeDB.Initialize("prj_8f92j10x84n", "pk_test_12345");<br/>
                  var dialog = await NarrativeDB.GetDialogue("DIA_001");
                </code>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Godot (GDScript)</h3>
              <div className="bg-[#1e1e1e] p-3 rounded-md border border-[#333]">
                <code className="text-xs text-yellow-300 font-mono">
                  var db = NarrativeDB.new()<br/>
                  db.init("prj_8f92j10x84n", "pk_test_12345")<br/>
                  var quest = await db.get_quest("QST_MAIN_01")
                </code>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Unreal Engine (C++)</h3>
              <div className="bg-[#1e1e1e] p-3 rounded-md border border-[#333]">
                <code className="text-xs text-blue-300 font-mono">
                  UNarrativeDBSubsystem* NDB = GetGameInstance()-&gt;GetSubsystem&lt;UNarrativeDBSubsystem&gt;();<br/>
                  NDB-&gt;Initialize(TEXT("prj_8f92j10x84n"), TEXT("pk_test..."));
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
