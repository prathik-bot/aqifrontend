import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import { UsersFilters } from '@/components/dashboard/users/users-filters';
import { UsersTable } from '@/components/dashboard/users/users-table';
import type { Users } from '@/components/dashboard/users/users-table';

export const metadata = { title: `Users | Dashboard | ${config.site.name}` } satisfies Metadata;

const users = [
  {
    id: '1',
    name: 'Prathik Kumar',
    avatar: '/assets/aqi.png',
    email: 'smartaqitrend@gmail.com',
    phone: '908-691-3242',
    address: { city: 'SFO', country: 'USA', state: 'CA', street: '4158 Hedge Street' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: '2',
    name: 'Smart Trend',
    avatar: '/assets/aqi.png',
    email: 'smartaqitrend@gmail.com',
    phone: '972-333-4106',
    address: { city: 'SFO', country: 'USA', state: 'CA', street: '4158 Hedge Street' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
] satisfies Users[];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;

  const paginatedUsers = applyPagination(users, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Users</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <UsersFilters />
      <UsersTable
        count={paginatedUsers.length}
        page={page}
        rows={paginatedUsers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Users[], page: number, rowsPerPage: number): Users[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
