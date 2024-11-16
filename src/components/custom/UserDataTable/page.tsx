import { columns } from "./columns"
import { DataTable } from "./data-table"
import { MockData } from '@/mocks/data'

export default function UserDataTable() {
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={MockData.users} />
        </div>
    )
}
