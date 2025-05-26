"use client"

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  Button,
  makeStyles,
  tokens,
  Spinner,
  TableColumnDefinition,
  createTableColumn,
  Toolbar,
  ToolbarButton,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  DialogActions,
  Input,
  SearchBox,
  Text,
} from "@fluentui/react-components";
import {
  EditRegular,
  DeleteRegular,
  AddRegular,
  SearchRegular,
} from "@fluentui/react-icons";
import { Sidebar } from "../components/Sidebar";
import type { Prescription } from "@/types/prescription";
import { useTranslations } from "next-intl";

const useStyles = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "250px 1fr",
    minHeight: "100vh",
    fontSize: "1rem", // This will be 2rem because of root size
  },
  sidebar: {
    backgroundColor: tokens.colorNeutralBackground2,
    padding: "1rem",
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  content: {
    padding: "2rem",
  },
  menuButton: {
    width: "100%",
    justifyContent: "flex-start",
    padding: "0.5rem 1rem",
    fontSize: "1rem", // This will be 2rem because of root size
    "& svg": {
      width: "32px",
      height: "32px",
    }
  },
  userSection: {
    marginTop: "auto",
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
    paddingTop: "1rem",
  },
  toolbar: {
    marginBottom: "1rem",
  },
  gridContainer: {
    width: '100%',
    '& tr': {
      display: 'grid',
      gridTemplateColumns: '100px 120px 100px 100px 100px',
      alignItems: 'center'
    },
    '& td:last-child': {
      justifySelf: 'end'
    }
  }
});

const ITEMS_PER_PAGE = 10;

export default function PrescriptionsPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });

  const styles = useStyles();
  const t = useTranslations('prescriptions');
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [newPrescription, setNewPrescription] = useState<Partial<Prescription>>({
    medication: '',
    frequency: '',
    duration: '',
    patientId: 0,
    doctorId: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchHint, setShowSearchHint] = useState(false);

  // Column definitions
  const columns: TableColumnDefinition<Prescription>[] = [
    createTableColumn<Prescription>({
      columnId: "id",
      compare: (a, b) => a.id.localeCompare(b.id),
      renderHeaderCell: () => t('columns.id'),
      renderCell: (item) => (
        <div className="w-16 truncate" title={item.id}>
          <Text>{item.id}</Text>
        </div>
      ),
    }),
    createTableColumn<Prescription>({
      columnId: "patientName",
      compare: (a, b) => a.patientName.localeCompare(b.patientName),
      renderHeaderCell: () => t('columns.patientName'),
      renderCell: (item) => (
        <div className="w-16 truncate" title={item.patientName}>
          <Text>{item.patientName}</Text>
        </div>
      ),
    }),
    createTableColumn<Prescription>({
      columnId: "medication",
      compare: (a, b) => a.medication.localeCompare(b.medication),
      renderHeaderCell: () => t('columns.medication'),
      renderCell: (item) => (
        <div className="max-w-[100px] truncate" title={item.medication}>
          <Text>{item.medication}</Text>
        </div>
      ),
    }),
    createTableColumn<Prescription>({
      columnId: "status",
      compare: (a, b) => a.status.localeCompare(b.status),
      renderHeaderCell: () => t('columns.status'),
      renderCell: (item) => (
        <div className="w-24 truncate">
          <span className={`px-2 py-1 rounded-full text-sm ${
            item.status === 'active' ? 'bg-green-100 text-green-800' :
            item.status === 'completed' ? 'bg-blue-100 text-blue-800' :
            'bg-red-100 text-red-800'
          }`}>
            {item.status}
          </span>
        </div>
      ),
    }),
    createTableColumn<Prescription>({
      columnId: "actions",
      renderHeaderCell: () => t('columns.actions'),
      renderCell: (item) => (
        <div className="flex gap-2 justify-end">
          <Button
            icon={<EditRegular />}
            appearance="subtle"
            onClick={() => handleEdit(item)}
          />
          <Button
            icon={<DeleteRegular />}
            appearance="subtle"
            onClick={() => handleDelete(item)}
          />
        </div>
      ),
    }),
  ];

  // Update the filter function to require 2 characters
  const filteredPrescriptions = searchTerm.length >= 2 
    ? prescriptions.filter(prescription => 
        Object.values(prescription).some(value => 
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : prescriptions;

  // Pagination calculations
  const totalPages = Math.ceil(filteredPrescriptions.length / ITEMS_PER_PAGE);
  const paginatedPrescriptions = filteredPrescriptions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleEdit = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setIsEditDialogOpen(true);
  };

  const handleNew = () => {
    setNewPrescription({
      medication: '',
      frequency: '',
      duration: '',
      patientId: 1, // You'll need to get this from somewhere
      doctorId: 1,  // You'll need to get this from the session
    });
    setIsNewDialogOpen(true);
  };

  const handleDelete = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedPrescription) return;

    try {
      const res = await fetch(`/api/prescriptions/${selectedPrescription.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session?.accessToken}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete prescription');

      setPrescriptions(prev => 
        prev.filter(p => p.id !== selectedPrescription.id)
      );
      setIsDeleteDialogOpen(false);
    } catch (err) {
      console.error('Delete error:', err);
      // Handle error (show notification, etc.)
    }
  };

  const handleCreatePrescription = async () => {
    try {
      alert("Creating prescription: " + JSON.stringify(newPrescription));
      
      const res = await fetch("/api/protected/prescription", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(newPrescription),
      });

      if (!res.ok) throw new Error('Failed to create prescription');

      const created = await res.json();
      setPrescriptions(prev => [created, ...prev]);
      setIsNewDialogOpen(false);
      setNewPrescription({});
    } catch (err) {
      console.error('Create error:', err);
      setError(err instanceof Error ? err.message : "Failed to create prescription");
    }
  };

  const handleUpdate = async (prescription: Prescription) => {
    try {
      const res = await fetch(`/api/protected/prescription?id=${prescription.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(prescription),
      });

      if (!res.ok) throw new Error('Failed to update prescription');

      const updated = await res.json();
      setPrescriptions(prev => 
        prev.map(p => p.id === updated.id ? updated : p)
      );
      setIsEditDialogOpen(false);
      setSelectedPrescription(null);
    } catch (err) {
      console.error('Update error:', err);
      setError(err instanceof Error ? err.message : "Failed to update prescription");
    }
  };

  useEffect(() => {
    async function loadPrescriptions() {
      try {
        const res = await fetch("/api/protected/prescription", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            // Include the session token if needed
            ...(session?.accessToken ? {
              'Authorization': `Bearer ${session.accessToken}`
            } : {})
          }
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch prescriptions: ${res.statusText}`);
        }

        const data = await res.json();
        setPrescriptions(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : "Failed to load prescriptions");
      } finally {
        setLoading(false);
      }
    }

    if (session) {
      loadPrescriptions();
    }
  }, [session]);

  // Add pagination helper function
  const getPageNumbers = (current: number, total: number) => {
    const delta = 2; // How many pages to show before and after current
    const pages: (number | string)[] = [];
    
    // Always show first page
    pages.push(1);
    
    // Calculate range around current page
    const rangeStart = Math.max(2, current - delta);
    const rangeEnd = Math.min(total - 1, current + delta);

    // Add ellipsis after first page if needed
    if (rangeStart > 2) {
      pages.push('...');
    }

    // Add pages in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (rangeEnd < total - 1) {
      pages.push('...');
    }

    // Always show last page if more than one page
    if (total > 1) {
      pages.push(total);
    }

    return pages;
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.content}>
        <Toolbar className={styles.toolbar}>
          <div className="flex justify-between items-center w-full">
            <ToolbarButton
              icon={<AddRegular />}
              onClick={handleNew}
            >
              New Prescription
            </ToolbarButton>

            <div className="flex flex-col">
              <SearchBox
                placeholder="Search prescriptions..."
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                  setShowSearchHint(value.length === 1);
                  setCurrentPage(1);
                }}
                onClear={() => {
                  setSearchTerm('');
                  setShowSearchHint(false);
                  setCurrentPage(1);
                }}
                className="w-64"
                size="medium"
                appearance="outline"
              />
              {showSearchHint && (
                <Text 
                  size={200} 
                  className="text-brand-600 mt-1"
                >
                  Please enter at least 2 characters to search.
                </Text>
              )}
            </div>
          </div>
        </Toolbar>

        {loading && <Spinner />}
        
        {error && (
          <div className="text-red-500">Error: {error}</div>
        )}
        
        {!loading && !error && (
          <>
            <div className={styles.gridContainer}>
              <DataGrid
                items={paginatedPrescriptions}
                columns={columns}
                sortable
              >
                <DataGridHeader>
                  <DataGridRow>
                    {({ renderHeaderCell }) => (
                      <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                    )}
                  </DataGridRow>
                </DataGridHeader>
                <DataGridBody>
                  {({ item, rowId }) => (
                    <DataGridRow key={rowId}>
                      {({ renderCell }) => (
                        <DataGridCell>{renderCell(item)}</DataGridCell>
                      )}
                    </DataGridRow>
                  )}
                </DataGridBody>
              </DataGrid>
            </div>

            <div className="flex justify-center items-center gap-2 mt-4">
              <Button
                appearance="subtle"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Previous
              </Button>

              {getPageNumbers(currentPage, totalPages).map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-2">
                    {page}
                  </span>
                ) : (
                    <Button
                    key={`page-${page}`}
                    appearance={currentPage === page ? "primary" : "subtle"}
                    onClick={() => setCurrentPage(page as number)}
                    style={{ minWidth: 'fit-content', padding: '6px 16px' }}
                    >
                    {page}
                    </Button>
                )
              ))}

              <Button
                appearance="subtle"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next
              </Button>
            </div>
          </>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen}>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Delete Prescription</DialogTitle>
              <DialogContent>
                Are you sure you want to delete this prescription?
              </DialogContent>
              <DialogActions>
                <Button
                  appearance="secondary"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  appearance="primary"
                  onClick={confirmDelete}
                >
                  Delete
                </Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen}>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Edit Prescription</DialogTitle>
              <DialogContent>
                <form className="space-y-4">
                  <div>
                    <label className="block mb-1">Patient Name</label>
                    <input
                      type="text"
                      value={selectedPrescription?.patientName || ''}
                      onChange={(e) => setSelectedPrescription(prev => 
                        prev ? {...prev, patientName: e.target.value} : null
                      )}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Medication</label>
                    <input
                      type="text"
                      value={selectedPrescription?.medication || ''}
                      onChange={(e) => setSelectedPrescription(prev => 
                        prev ? {...prev, medication: e.target.value} : null
                      )}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Status</label>
                    <select
                      value={selectedPrescription?.status || 'active'}
                      onChange={(e) => setSelectedPrescription(prev => 
                        prev ? {...prev, status: e.target.value as Prescription['status']} : null
                      )}
                      className="w-full p-2 border rounded"
                    >
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </form>
              </DialogContent>
              <DialogActions>
                <Button
                  appearance="secondary"
                  onClick={() => {
                    setIsEditDialogOpen(false);
                    setSelectedPrescription(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  appearance="primary"
                  onClick={async () => {
                    if (!selectedPrescription) return;
                    
                    try {
                      const res = await fetch(`/api/prescriptions/${selectedPrescription.id}`, {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${session?.accessToken}`,
                        },
                        body: JSON.stringify(selectedPrescription),
                      });

                      if (!res.ok) throw new Error('Failed to update prescription');

                      setPrescriptions(prev => 
                        prev.map(p => p.id === selectedPrescription.id ? selectedPrescription : p)
                      );
                      setIsEditDialogOpen(false);
                      setSelectedPrescription(null);
                    } catch (err) {
                      console.error('Update error:', err);
                      // Handle error (show notification, etc.)
                    }
                  }}
                >
                  Save Changes
                </Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>

        {/* New Prescription Dialog */}
        <Dialog open={isNewDialogOpen}>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>New Prescription</DialogTitle>
              <DialogContent>
                <form className="space-y-4">
                  <div>
                    <label className="block mb-1">Medication</label>
                    <input
                      type="text"
                      value={newPrescription.medication || ''}
                      onChange={(e) => setNewPrescription(prev => ({
                        ...prev,
                        medication: e.target.value
                      }))}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Frequency</label>
                    <input
                      type="text"
                      value={newPrescription.frequency || ''}
                      onChange={(e) => setNewPrescription(prev => ({
                        ...prev,
                        frequency: e.target.value
                      }))}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Duration</label>
                    <input
                      type="text"
                      value={newPrescription.duration || ''}
                      onChange={(e) => setNewPrescription(prev => ({
                        ...prev,
                        duration: e.target.value
                      }))}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </form>
              </DialogContent>
              <DialogActions>
                <Button
                  appearance="secondary"
                  onClick={() => {
                    setIsNewDialogOpen(false);
                    setNewPrescription({});
                  }}
                >
                  Cancel
                </Button>
                <Button
                  appearance="primary"
                  onClick={handleCreatePrescription}
                >
                  Create
                </Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      </main>
    </div>
  );
}