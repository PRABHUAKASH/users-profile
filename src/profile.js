import React,{useEffect,useState} from "react";
import axios from "axios";
import "./App.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import {Link} from 'react-router-dom';


function Profile(){
    let formValues = {
        id: "",
        name: "",
        age: "",
        phoneno: "",
        address: "",
        images : "",
        gender : "",
        error: {
            name: "",
            age: "",
            phoneno: "",
            address: "",
            images : "",
            gender : "",
        },
      };
      const [formData, setFormData] = useState(formValues);
      const [userData, setUserData] = useState([]);
    
      useEffect(() => {
        async function getData() {
          const response = await axios.get(
            "https://6320876e9f82827dcf2ede90.mockapi.io/profile"
          );
          setUserData(response.data);
        }
        getData();
      }, []);
    
      const handleChange = (e) => {
        let error = { ...formData.error };
        if (e.target.value === "") {
          error[e.target.name] = `${e.target.name} is Required`;
        } else {
          error[e.target.name] = "";
        }
        setFormData({ ...formData, [e.target.name]: e.target.value, error });
      };
    
      const onPopulateData = (id) => {
        const selectedData = userData.filter((row) => row.id === id)[0];
        setFormData({
          ...formData,
          ...selectedData,
        });
      };
      const handleDelete = async (id) => {
        const response = await axios.delete(
          `https://6320876e9f82827dcf2ede90.mockapi.io/profile/${id}`
        );
        console.log(response);
        const user = userData.filter((row) => row.id !== response.data.id);
        setUserData(user);
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const errKeys = Object.keys(formData).filter((key) => {
          if (formData[key] === "" && key != "error" && key != "id") {
            return key;
          }
        });
        if (errKeys.length >= 1) {
          alert("Please fill all values");
        } else {
          if (formData.id) {
    
            const response = await axios.put(
              `https://6320876e9f82827dcf2ede90.mockapi.io/profile/${formData.id}`,
              {
                name: formData.name,
                age: formData.age,
                phoneno: formData.phoneno,
                address: formData.address,
                images : formData.images,
                gender : formData.gender,
              }
            );
            let users = [...userData];
            let index = users.findIndex((row) => row.id === response.data.id);
            users[index] = response.data;
            setUserData(users);
          } else {
        
            const response = await axios.post(
              "https://6320876e9f82827dcf2ede90.mockapi.io/profile",
              {
                name: formData.name,
                age: formData.age,
                phoneno: formData.phoneno,
                address: formData.address,
                images : formData.images,
                gender : formData.gender,
              }
            );
            setUserData([...userData, response.data]);
          }
          setFormData(formValues);
        }
      };
    return(
        <div style={{ padding: "20px" }}>
      
        <Link to="/"><Button variant="outlined">USERS</Button>&nbsp;</Link>
        <Link to="/Profile"><Button variant="outlined">PROFILE</Button></Link>
        
        <h3> Profile Form</h3>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "30ch" },
          }}
          autoComplete="off"
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextField
            id="name"
            label="Name"
            variant="standard"
            value={formData.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          <br />
          <span style={{ color: "red" }}>{formData.error.name}</span>
          <br />
          <TextField
            id="age"
            label="Age"
            variant="standard"
            type="number"
            name="age"
            value={formData.age}
            onChange={(e) => handleChange(e)}
          />
          <br />
          <span style={{ color: "red" }}>{formData.error.age}</span>
          <br />
          <TextField
            id="phoneno"
            type="phoneno"
            label="PhoneNo"
            variant="standard"
            name="phoneno"
            value={formData.phoneno}
            onChange={(e) => handleChange(e)}
          />
          <br />
          <span style={{ color: "red" }}>{formData.error.phoneno}</span>
          <br />
          <TextField
            id="address"
            type="address"
            label="Address"
            variant="standard"
            name="address"
            value={formData.address}
            onChange={(e) => handleChange(e)}
          />
          <br />
          <span style={{ color: "red" }}>{formData.error.address}</span>
          <br />
          <TextField
            id="images"
            type="images"
            label="Images"
            variant="standard"
            name="images"
            value={formData.images}
            onChange={(e) => handleChange(e)}
          />
          <br />
          <span style={{ color: "red" }}>{formData.error.images}</span>
          <br />
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="gender"
            value={formData.gender}
            onChange={(e) => handleChange(e)}
          >
            <FormControlLabel value="Female" control={<Radio />} label="Female" />
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel value="Other" control={<Radio />} label="Other" />
          </RadioGroup>
          <br />
          <span style={{ color: "red" }}>{formData.error.gender}</span>
          
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
        {/* ========================================================================================================== */}
        <h3>  Profile Data </h3>
        <TableContainer component={Paper}>
          <Table sx={{ width: 1300 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Age</TableCell>
                <TableCell align="right">Phoneno</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Images</TableCell>
                <TableCell align="right">Gender</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.age}</TableCell>
                  <TableCell align="right">{row.phoneno}</TableCell>
                  <TableCell align="right">{row.address}</TableCell>
                  <TableCell align="right">{row.images}</TableCell>
                  <TableCell align="right">{row.gender}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => onPopulateData(row.id)}>
                      Edit
                    </Button>&nbsp;
                    <Button variant="contained" onClick={() => handleDelete(row.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
       
    );

};
export default Profile;