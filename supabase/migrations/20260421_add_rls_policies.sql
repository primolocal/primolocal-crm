-- Enable RLS on all CRM tables
alter table contacts enable row level security;
alter table deals enable row level security;
alter table tasks enable row level security;
alter table activities enable row level security;
alter table events enable row level security;

-- Allow authenticated users full CRUD access
-- This is a shared team CRM: every team member sees and edits the same data

create policy "Allow full access to authenticated users"
 on contacts for all to authenticated using (true) with check (true);

create policy "Allow full access to authenticated users"
 on deals for all to authenticated using (true) with check (true);

create policy "Allow full access to authenticated users"
 on tasks for all to authenticated using (true) with check (true);

create policy "Allow full access to authenticated users"
 on activities for all to authenticated using (true) with check (true);

create policy "Allow full access to authenticated users"
 on events for all to authenticated using (true) with check (true);
