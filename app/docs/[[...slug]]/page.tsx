import { DocsInterface } from "@/components/docs-interface";
import { createClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

interface DocPageProps {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function DocPage(props: DocPageProps) {
  // We don't really use the slug for now as we are replacing the docs with a single registry page
  // But we keep the file structure valid.
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let isPaid = false;

  if (user) {
    const { data: payments } = await supabaseAdmin
      .from("payments")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "paid")
      .limit(1);
    
    if (payments && payments.length > 0) {
      isPaid = true;
    }
  }

  return (
    <div className="py-6">
      <DocsInterface isPaid={isPaid} userEmail={user?.email} />
    </div>
  );
}
