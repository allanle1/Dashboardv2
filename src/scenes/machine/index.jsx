import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import MachineSettings from "components/MachineSettings";
import { auth } from "firebase-config";
import {
  collection,
  doc,
  getFirestore,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { UserAuth } from "state/AuthContext";
const Machine = () => {
  const [machines, setMachines] = useState([]);
  const theme = useTheme();
  const { user } = UserAuth();


  const fetchPosts = useCallback(async () => {
    try {
      const db = getFirestore();

      const userCollectionRef = collection(db, "sites");

      const userDocRef = doc(userCollectionRef, user?.site?._uid);

      const postsCollectionRef = collection(userDocRef, "machines");

      const querySnapshot = await getDocs(postsCollectionRef);
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Add the document ID to the data
        ...doc.data(), // Include the rest of the data
      }));
      setMachines(postsData);
      console.log(postsData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [user?.site?._uid]); 

  
  const onSubmit = async (message, id) => {
    try {
      const db = getFirestore();

      const userCollectionRef = collection(db, "sites");

      const userDocRef = doc(userCollectionRef, user?.site?._uid);

      const machinesCollectionRef = collection(userDocRef, "machines");
      const machineDocRef = doc(machinesCollectionRef, id);

      await updateDoc(machineDocRef, {
        nextservicehours: message,
      });
      fetchPosts();
      console.log("Machines subcollection updated successfully.");
    } catch (error) {
      console.error("Error updating machines subcollection: ", error);
    }
    console.log(message, id);
  };
  
  useEffect(() => {
    if (user?.site?._uid) {
      fetchPosts();
    }
  }, [fetchPosts, user]);


  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        padding: "20px",
        flexWrap: "wrap",
      }}
    >
      {machines.map((machine, i) => {
        return (
          <Card
            key={i}
            sx={{
              backgroundImage: "none",
              backgroundColor: theme.palette.background.alt,
              borderRadius: "0.55rem",
            }}
          >
            <CardContent>
              <FlexBetween>
                <Typography
                  sx={{ fontSize: 14 }}
                  color={theme.palette.secondary[400]}
                  gutterBottom
                >
                  location: {machine?.location}
                </Typography>
                <MachineSettings data={machine} onSubmit={onSubmit} />
              </FlexBetween>

              <Typography variant="h3" component="div">
                machineid: {machine?.machineid}
              </Typography>
              <Typography
                sx={{ mt: "1rem", mb: "1rem", fontSize: 20 }}
                color={theme.palette.secondary[400]}
              >
                Current Machine Hours: {machine?.currentmachinehours}
              </Typography>
              <Typography
                sx={{ mt: "1rem", mb: "1rem", fontSize: 20 }}
                color={theme.palette.secondary[400]}
              >
                Next Service Hours: {machine?.nextservicehours}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default Machine;
