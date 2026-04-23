create table contacts (
 id uuid default gen_random_uuid() primary key,
 name text not null,
 email text,
 phone text,
 company text,
 industry text,
 city text,
 state text,
 tags text[] default '{}',
 notes text,
 source text default 'manual',
 created_at timestamptz default now(),
 updated_at timestamptz default now()
);

comment on table contacts is 'Leads and prospects for the Founders Plan';

create table deals (
 id uuid default gen_random_uuid() primary key,
 contact_id uuid not null references contacts(id) on delete cascade,
 title text not null,
 value integer not null default 10000,
 stage text not null default 'lead' check (stage in ('lead','contacted','demo_booked','pilot','pay_what_worth','founder','live')),
 priority text not null default 'medium' check (priority in ('low','medium','high')),
 source text default 'cold_email',
 created_at timestamptz default now(),
 updated_at timestamptz default now()
);

comment on table deals is 'Pipeline deals for the Founders Plan';

create table tasks (
 id uuid default gen_random_uuid() primary key,
 title text not null,
 description text,
 status text not null default 'todo' check (status in ('todo','in_progress','done')),
 priority text not null default 'medium' check (priority in ('low','medium','high')),
 due_date timestamptz,
 contact_id uuid references contacts(id) on delete set null,
 deal_id uuid references deals(id) on delete set null,
 created_at timestamptz default now()
);

comment on table tasks is 'Follow-ups and action items';

create table activities (
 id uuid default gen_random_uuid() primary key,
 type text not null check (type in ('call','email','sms','note','meeting','demo','day_30')),
 contact_id uuid not null references contacts(id) on delete cascade,
 deal_id uuid references deals(id) on delete set null,
 content text not null,
 created_at timestamptz default now()
);

comment on table activities is 'Activity timeline for contacts and deals';

create table events (
 id uuid default gen_random_uuid() primary key,
 title text not null,
 description text,
 start_time timestamptz not null,
 end_time timestamptz not null,
 contact_id uuid references contacts(id) on delete set null,
 deal_id uuid references deals(id) on delete set null,
 type text not null check (type in ('demo','day_30_conversion','follow_up','onboarding','other')),
 created_at timestamptz default now()
);

comment on table events is 'Calendar events for demos and Day 30 conversions';

-- indexes for common queries

create index idx_deals_contact_id on deals(contact_id);
create index idx_deals_stage on deals(stage);
create index idx_tasks_contact_id on tasks(contact_id);
create index idx_tasks_deal_id on tasks(deal_id);
create index idx_tasks_status on tasks(status);
create index idx_activities_contact_id on activities(contact_id);
create index idx_activities_deal_id on activities(deal_id);
create index idx_events_contact_id on events(contact_id);
create index idx_events_start_time on events(start_time);
