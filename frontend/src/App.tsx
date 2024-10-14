import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid';
import {
  Paper,
  Box,
  Toolbar,
  Button,
  Modal,
  Typography,
  Chip,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup
} from '@mui/material';

import GenericDialog from './components/GenericDialogProps/GenericDialog';
import { addAnimal, fetchAnimals, updateAnimalStatus } from './services/AnimalService';
import { Animal } from './model/Animal';
import './App.css';

export default function App() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Animal | null>(null);

  const [formState, setFormState] = useState({
    name: '',
    description: '',
    birthDate: '',
    imageUrl: '',
    selectedCategory: '',
    selectedStatus: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    birthDate: '',
    category: '',
  });

  useEffect(() => {
    const loadAnimals = async () => {
      try {
        const data = await fetchAnimals();
        setAnimals(data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    };
    loadAnimals();
  }, []);

  const handleRowClick = (params: GridRowParams) => {
    const selectedAnimal = params.row as Animal;
    setSelectedRow(selectedAnimal);
    setModalOpen(true);
  };

  const handleFormChange = (field: keyof typeof formState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {
      name: formState.name ? '' : 'O nome é obrigatório.',
      description: formState.description ? '' : 'A descrição é obrigatória.',
      birthDate: formState.birthDate ? '' : 'A data de nascimento é obrigatória.',
      category: formState.selectedCategory ? '' : 'A categoria é obrigatória.',
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err);
  };

  const handleAddAnimal = async () => {
    if (!validateForm()) return;

    const newAnimal: Animal = {
      ...formState,
      id: 0,
      birthDate: new Date(formState.birthDate),
      status: formState.selectedStatus as 'ADOPTED' | 'AVAILABLE',
      category: ''
    };

    try {
      const response = await addAnimal(newAnimal);
      setAnimals((prev) => [...prev, response]);
      resetForm();
    } catch (error) {
      console.error('Erro ao adicionar o animal:', error);
    }
  };

  const resetForm = () => {
    setFormState({
      name: '',
      description: '',
      birthDate: '',
      imageUrl: '',
      selectedCategory: '',
      selectedStatus: '',
    });
    setErrors({ name: '', description: '', birthDate: '', category: '' });
    setDialogOpen(false);
  };

  const handleStatusChange = async (newStatus: 'ADOPTED' | 'AVAILABLE') => {
    if (!selectedRow) return;

    try {
      const updatedAnimal = await updateAnimalStatus(selectedRow.id, [newStatus]);
      setAnimals((prev) =>
        prev.map((animal) =>
          animal.id === updatedAnimal.id ? { ...animal, status: newStatus } : animal
        )
      );

      window.location.reload();
      setModalOpen(false);
    } catch (error) {
      console.error('Failed to update the animal status:', error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Nome', width: 200 },
    { field: 'description', headerName: 'Descrição', width: 400 },
    { field: 'category', headerName: 'Tipo de Pet', width: 200 },
    { field: 'birthDate', headerName: 'Nascimento', width: 150 },
    { field: 'age', headerName: 'Idade', width: 100 },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value === 'ADOPTED' ? 'ADOTADO' : 'DISPONÍVEL'}
          color={params.value === 'ADOPTED' ? 'error' : 'success'}
          style={{ color: 'white' }}
        />
      ),
    },
  ];

  return (
    <>
      <Toolbar className='toolbar'>
        Animal Donations
        <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
          Registrar Novo Animal
        </Button>
      </Toolbar>

      <Paper sx={{ height: '100%', width: '100%' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={animals}
            columns={columns}
            onRowClick={handleRowClick}
            pageSizeOptions={[animals.length]}
            sx={{ border: 0 }}
          />
        )}
      </Paper>

      <GenericDialog
        open={dialogOpen}
        title="Registrar Novo Animal"
        onClose={() => setDialogOpen(false)}
        onConfirm={handleAddAnimal}
        content={
          <form>
            <TextField
              label="Nome"
              fullWidth
              margin="normal"
              value={formState.name}
              onChange={(e) => handleFormChange('name', e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Descrição"
              fullWidth
              margin="normal"
              value={formState.description}
              onChange={(e) => handleFormChange('description', e.target.value)}
              error={!!errors.description}
              helperText={errors.description}
            />
            <TextField
              label="URL da imagem"
              fullWidth
              margin="normal"
              value={formState.imageUrl}
              onChange={(e) => handleFormChange('imageUrl', e.target.value)}
            />
            <FormControl fullWidth margin="normal" error={!!errors.category}>
              <InputLabel>Tipo de Pet</InputLabel>
              <Select
                value={formState.selectedCategory}
                onChange={(e) => handleFormChange('selectedCategory', e.target.value)}
              >
                <MenuItem value="cachorro">Cachorro</MenuItem>
                <MenuItem value="gato">Gato</MenuItem>
                <MenuItem value="coelho">Coelho</MenuItem>
                <MenuItem value="passaro">Passaro</MenuItem>
                <MenuItem value="tartaruga">Tartaruga</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Data de Nascimento"
              fullWidth
              type="date"
              margin="normal"
              value={formState.birthDate}
              onChange={(e) => handleFormChange('birthDate', e.target.value)}
              error={!!errors.birthDate}
              helperText={errors.birthDate}
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={formState.selectedStatus}
                onChange={(e) => handleFormChange('selectedStatus', e.target.value as 'ADOPTED' | 'AVAILABLE')}
              >
                <MenuItem value="AVAILABLE">DISPONÍVEL</MenuItem>
                <MenuItem value="ADOPTED">ADOTADO</MenuItem>
              </Select>
            </FormControl>
          </form>
        }
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 700, bgcolor: 'background.paper', boxShadow: 24, p: 4
        }}>
          {selectedRow && (
            <>
              <Typography variant="h6">Detalhes do Animal</Typography>
              <img src={selectedRow.imageUrl} alt="Animal" width={200} />
              <Typography><strong>ID:</strong> {selectedRow.id}</Typography>
              <Typography><strong>Nome:</strong> {selectedRow.name}</Typography>
              <Typography><strong>Descrição:</strong> {selectedRow.description}</Typography>
              <Typography><strong>Categoria:</strong> {selectedRow.category}</Typography>
              <Typography><strong>Nascimento:</strong> {new Date(selectedRow.birthDate).toLocaleDateString()}</Typography>
              <Typography><strong>Idade:</strong> {selectedRow.age}</Typography>

              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={selectedRow.status === 'AVAILABLE'} onChange={() => handleStatusChange('AVAILABLE')} />}
                  label="Disponível"
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedRow.status === 'ADOPTED'} onChange={() => handleStatusChange('ADOPTED')} />}
                  label="Adotado"
                />
              </FormGroup>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}