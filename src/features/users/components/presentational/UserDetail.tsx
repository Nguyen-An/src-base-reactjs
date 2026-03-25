import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { User } from '../../types'

interface UserDetailProps {
  user: User
  isDeleting: boolean
  onDelete: () => void
}

/**
 * PRESENTATIONAL component — renders a single user's detail card.
 * No hooks, no API calls. Pure render from props.
 */
export function UserDetail({ user, isDeleting, onDelete }: UserDetailProps) {
  return (
    <div className="max-w-lg space-y-6">
      {/* Back link */}
      <Link
        to="/users"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to Users
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Row label="ID" value={user.id} mono />
          <Row label="Gmail" value={user.gmail} />
          <Row label="Phone" value={user.phonenumber} />
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="destructive" isLoading={isDeleting} onClick={onDelete}>
          Delete User
        </Button>
      </div>
    </div>
  )
}

// ─── Helper ──────────────────────────────────────────────────────────────────

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className={mono ? 'font-mono text-sm' : 'text-sm'}>{value}</span>
    </div>
  )
}
