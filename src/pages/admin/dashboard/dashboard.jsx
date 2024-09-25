import { useEffect, useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Button } from "@mui/material";
import { toast } from 'react-toastify';
import './dashboard.css'

const Admindashboard = () => {
  const [databaselist, setdatabaselist] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    fetchdblist();
  }, [])

  const fetchdblist = async () => {
    const token = localStorage.getItem("token");
    setloading(true);
    try {
      const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}databaseList`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });
      const data = await responsee.json();
      console.log(data)
      // Filter out system databases 'admin' and 'local'
      const filteredDatabases = data.database.filter(db => db.name !== 'admin' && db.name !== 'local');
      
      setdatabaselist(filteredDatabases);
      setloading(false)
    } catch (error) {
      console.log(error);
      setloading(false)
    }
  }
  

  const createBackup = async (dbname) => {
    const token = localStorage.getItem("token");
    const toaste = toast.loading("Please wait...");
    setloading(true)
    try {
      const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}dbbackup`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ dbname })
      });
      const data = await responsee.json();
      setloading(false)
      if (responsee.ok) {
        toast.update(toaste, { render: data.message, type: "success", isLoading: false, autoClose: 1700 });
      } else {
        return toast.update(toaste, { render: data.message, type: "warning", isLoading: false, autoClose: 2100 });
      }
    } catch (error) {
      setloading(false)
      console.log(error);
      toast.update(toaste, { render: error.message, type: "warning", isLoading: false, autoClose: 2700 });
    }
  }

  const formatSize = (sizeInBytes) => {
    const sizeInKB = sizeInBytes / 1024;
    if (sizeInKB >= 1024) {
      return `${(sizeInKB / 1024).toFixed(2)} MB`;
    }
    return `${sizeInKB.toFixed(2)} KB`;
  }

  return (
    <div className="admindashboard">
      <div className="inner">
        <div className="controler">
          <h2 style={{ textAlign: 'center' }}>Admin Dashboard</h2>
          <LoadingButton
            loading={loading}
            onClick={() => fetchdblist()}
            loadingPosition="end"
            endIcon={<RefreshIcon />}
            variant="outlined"
            type="submit"
            size="small"
            className="refreshe"
          >
            REFRESH
          </LoadingButton>
        </div>
        <div className="header">
          <span>#</span>
          <span>Db Name</span>
          <span>Size</span>
          <span>Empty</span>
          <span>Backup</span>
          <span>Restore</span>
        </div>
        <div className="body">
        {loading && <p style={{textAlign:'center'}}> Data Loading, Please Wait...</p> }
        
          {databaselist.map((val, ind) => {
            return (
              <div key={ind}>
                <span>{ind + 1}</span>
                <span>{val?.name}</span>
                <span>{formatSize(val?.sizeOnDisk)}</span> {/* Display size as KB or MB */}
                <span>{val?.empty ? "Empty" : "Data"}</span>
                <span>
                  <Button
                    disabled={loading}
                    size="small"
                    variant="contained"
                    onClick={() => createBackup(val?.name)}
                  >
                    Backup
                  </Button>
                </span>
                <span>
                  <Button disabled={loading} size="small" variant="outlined">Restore</Button>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Admindashboard;
