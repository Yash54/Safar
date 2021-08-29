import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UserCarCardList from '../../../assets/UserCarCard/UserCarCardList';
import axios from 'axios';
import { authHeader } from "../../../../services/authHeader";
import './UserTabs.css';
import { useHistory } from 'react-router-dom';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '75%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: "-1px 1px 13px 1px rgba(0, 0, 0, 0.3)",
        margin:"auto 5%",
        top : "0%"
    },
  }));


export const UserTabs = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const history = useHistory();
    const [data, setData] = React.useState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        console.log(index);
        setValue(index);
    };

    useEffect(() => {
        if (value === 0) {
            axios({
                method: "get",
                url: "/user/getaddedcar",
                headers: authHeader(),
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    setData(res.data)
                }
            }).catch = (err) => {
                console.log(err);
            };
        } else if (value === 1) {
            axios({
                method: "get",
                url: "/user/getlendedcar",
                headers: authHeader(),
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    setData(res.data)
                }
            }).catch = (err) => {
                console.log(err);
            };
        } else if (value === 2) {
            axios({
                method: "get",
                url: "/user/getrentedcar",
                headers: authHeader(),
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    setData(res.data)
                }
            }).catch = (err) => {
                console.log(err);
            };
        } else if (value === 3) {
            axios({
                method: "get",
                url: "/user/getrequestedcar",
                headers: authHeader(),
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data.lendedby);
                    setData(res.data.lendedby)
                }
            }).catch = (err) => {
                console.log(err);
            };
        } else {
            axios({
                method: "get",
                url: "/user/getrequestedcar",
                headers: authHeader(),
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data.borrowedby,"user tabs 4");
                    setData(res.data.borrowedby);
                }
            }).catch = (err) => {
                console.log(err);
            };
        }
    }, [value])

    return (
        <div>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab style={{ padding: "1%" }} label="My Cars" {...a11yProps(0)} ></Tab>
                    <Tab style={{ padding: "1%" }} label="Lended Cars" {...a11yProps(1)}></Tab>
                    <Tab style={{ padding: "1%" }} label="Rented Cars" {...a11yProps(2)}></Tab>
                    <Tab style={{ padding: "1%" }} label="Received Requests" {...a11yProps(3)}></Tab>
                    <Tab style={{ padding: "1%" }} label="Sent Requests" {...a11yProps(4)}></Tab>
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
                style={{ fontSize: "3vh" }}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    {data && <UserCarCardList list={data} cardtype="0" />}
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    {data && <UserCarCardList list={data} cardtype="1" />}
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    {data && <UserCarCardList list={data} cardtype="2" />}
                </TabPanel>

                <TabPanel value={value} index={3} dir={theme.direction}>
                    {data && <UserCarCardList list={data} cardtype="3" />}
                </TabPanel>

                <TabPanel value={value} index={4} dir={theme.direction}>
                    {data && <UserCarCardList list={data} cardtype="4" />}
                </TabPanel>
            </SwipeableViews>
        </div>
    )
}
