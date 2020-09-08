import React,{useState,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto"
  },
  paper: {
    width: 200,
    height: 230,
    overflow: "auto",
    border: "1px solid #c1c1c1"
  },
  button: {
    margin: theme.spacing(0.5, 0),
    fontSize: '2rem'
  }
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList({listProject,listOtherProject}) {
  const classes = useStyles();
  const [checked, setChecked] =useState([]);
  const [left, setLeft] =useState(listProject.project);
  const [right, setRight] =useState([]);
  const [maxList, setMaxList] =useState(8);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

//   const handleAllRight = () => {
//     console.log(right.length);
//     if (right.length <= maxList) {
//       setRight(right.concat(left));
//       setLeft([]);
//     }
//   };

  const handleCheckedRight = () => {
    if (right.length <= maxList && checked.length <= maxList) {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));

        fetch('http://api.sato.id/api/insertOtherProjects',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({listproject:right.concat(leftChecked)})
        })
        .then((response) => response.json())
        .then((dataRes) => {
            console.log('Success:', dataRes);
        })

    } else {
        alert('pilih 8 aja')
    }

  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));

    fetch('http://api.sato.id/api/insertOtherProjects',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({listproject:not(right, rightChecked)})
    })
    .then((response) => response.json())
    .then((dataRes) => {
        console.log('Success:', dataRes);
    })
  };

//   const handleAllLeft = () => {
//     setLeft(left.concat(right));
//     setRight([]);
//   };

   useEffect(() => {

        let l = listOtherProject.other_projects[0].listproject.split(',').map(Number)

        let p = listProject.project.filter((item,i)=>{
            return l.includes(item.idProject)
        })

        let p2 = listProject.project.filter((item,i)=>{
            return !l.includes(item.idProject)
        })

        setRight(p)
        setLeft(p2)
    }, [])


  const customList = (items) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((value,i) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={i}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.name}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );


  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          {/* <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllRight}
            disabled={left.length === 0 || right.length === 2}
            aria-label="move all right"
          >
            ≫
          </Button> */}
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          {/* <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button> */}
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
}
