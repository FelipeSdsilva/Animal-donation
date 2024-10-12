import Paper from '@mui/material/Paper';
import { Animal } from './model/Animal';
import { useEffect, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import { addAnimal, fetchAnimals } from './services/AnimalService';
import GenericDialog from './components/GenericDialogProps/GenericDialog';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid';
import { Modal, Box, Typography, Chip, CircularProgress, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './App.css';

export default function App() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Animal | null>(null);


  // Estados para o formulário
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('AVAILABLE');
  // Estados para mensagens de erro
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    imageUrl: '',
    category: '',
    birthDate: '',
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

  const handleRowClick = (params : GridRowParams) => {
    setSelectedRow(params.row as Animal);
    setOpen(true);
  };


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Nome', width: 200 },
    { field: 'description', headerName: 'Descrição', width: 500 },
    { field: 'category', headerName: 'Tipo de Pet', width: 200 },
    { field: 'birthDate', headerName: 'Nascimento', width: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value === 'ADOPTED' ? 'ADOTADO' : 'ADOTAR'}
          color={params.value === 'ADOPTED' ? 'error' : 'success'}
          style={{ color: 'white' }}
        />
      ),
    },
  ];

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      description: '',
      imageUrl: '',
      category: '',
      birthDate: '',
    };

    if (!name) {
      newErrors.name = 'O nome é obrigatório.';
      isValid = false;
    }
    if (!description) {
      newErrors.description = 'A descrição é obrigatória.';
      isValid = false;
    }
    if (!selectedCategory) {
      newErrors.category = 'A Tipo de Pet é obrigatório.';
      isValid = false;
    }
    if (!birthDate) {
      newErrors.birthDate = 'A data de nascimento é obrigatória.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddAnimal = async () => {
    if (!validateForm()) return; // Se a validação falhar, não continue

    const newAnimal: Animal = {
      name,
      description,
      imageUrl,
      category: selectedCategory,
      birthDate: new Date(birthDate),
      status: selectedStatus as 'ADOPTED' | 'AVAILABLE',
      id: 0
    };


    try {
      const response = await addAnimal(newAnimal);
      console.log(response);

      setAnimals((prev) => [...prev, response]); // Adiciona o novo animal à lista
      handleDialogClose();
      setName('');
      setDescription('');
      setImageUrl('');
      setSelectedCategory('');
      setBirthDate('');
      setSelectedStatus('AVAILABLE'); // Reseta o status
      setErrors({ name: '', imageUrl: '', description: '', category: '', birthDate: '' }); // Reseta mensagens de erro
    } catch (error) {
      console.error('Erro ao adicionar o animal:', error);
    }
  };

  const handleDialogClose = () => setDialogOpen(false);

  // Conteúdo do formulário para o diálogo de adição
  const animalFormContent = (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleAddAnimal();
    }}>
      <TextField
        label="Nome"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={!!errors.name} // Aplica erro se houver
        helperText={errors.name} // Mensagem de erro
      />
      <TextField
        label="Descrição"
        variant="outlined"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={!!errors.description} // Aplica erro se houver
        helperText={errors.description} // Mensagem de erro
      />
      <TextField
        label="URL da imagem"
        variant="outlined"
        fullWidth
        margin="normal"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <FormControl fullWidth margin="normal" error={!!errors.category}>
        <InputLabel id="category-select-label">Tipo de Pet</InputLabel>
        <Select
          labelId="category-select-label"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          label="Tipo de Pet"
        >
          <MenuItem value="cachorro">Cachorro</MenuItem>
          <MenuItem value="gato">Gato</MenuItem>
          <MenuItem value="coelho">Coelho</MenuItem>
          {/* Adicione mais opções conforme necessário */}
        </Select>
        {errors.category && <Typography color="error">{errors.category}</Typography>} {/* Mensagem de erro */}
      </FormControl>
      <TextField
        label="Data de Nascimento"
        variant="outlined"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        error={!!errors.birthDate} // Aplica erro se houver
        helperText={errors.birthDate} // Mensagem de erro
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select
          labelId="status-select-label"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as 'ADOPTED' | 'AVAILABLE')}
          label="Status"
        >
          <MenuItem value="AVAILABLE">ADOTAR</MenuItem>
          <MenuItem value="ADOPTED">ADOTADO</MenuItem>
        </Select>
      </FormControl>
    </form>
  );

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
        onClose={handleDialogClose}
        onConfirm={handleAddAnimal} // Chama a função de adicionar
        content={animalFormContent} // Passa o conteúdo do formulário
      />

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-description" sx={{ mt: 2 }} variant="h6">Detalhes do Animal</Typography>
          {selectedRow && (
            <Typography sx={{ mt: 2 }}>
              <img src={selectedRow.imageUrl} alt="Animal" /><br />
              <strong>ID:</strong> {selectedRow.id}<br />
              <strong>Nome:</strong> {selectedRow.name}<br />
              <strong>Descrição:</strong> {selectedRow.description}<br />
              <strong>Categoria:</strong> {selectedRow.category}<br />
              <strong>Data de Nascimento:</strong> {new Date(selectedRow.birthDate).toDateString()}<br />
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as 'ADOPTED' | 'AVAILABLE')}
                label="Status"
              >
                <MenuItem value="AVAILABLE">ADOTAR</MenuItem>
                <MenuItem value="ADOPTED">ADOTADO</MenuItem>
              </Select>
            </Typography>
          )}
        </Box>
      </Modal>
    </>
  );
}
