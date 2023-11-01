import React, { useState, useEffect, useRef } from "react";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";

import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Step from "@material-ui/core/Step";
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import StepContent from "@material-ui/core/StepContent";

import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


import { i18n } from "../../translate/i18n";

import api from "../../services/api";
import toastError from "../../errors/toastError";
import ColorPicker from "../ColorPicker";
import { IconButton, Input, InputAdornment } from "@material-ui/core";
import { Colorize, Label } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
	},
	textField: {
		marginRight: theme.spacing(1),
		flex: 1,
	},

	btnWrapper: {
		position: "relative",
	},

	buttonProgress: {
		color: green[500],
		position: "absolute",
		top: "50%",
		left: "50%",
		marginTop: -12,
		marginLeft: -12,
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	colorAdorment: {
		width: 20,
		height: 20,
	},
	label:{
		fontSize: "15px", 
		border: "2px solid #000",
		borderRadius: "10px"
	}
}));

const QueueSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	color: Yup.string().min(3, "Too Short!").max(9, "Too Long!").required(),
	greetingMessage: Yup.string(),
});

const QueueModal = ({ open, onClose, queueId }) => {
	const classes = useStyles();

	const initialState = {
		name: "",
		color: "",
		greetingMessage: "",
	};

	const [colorPickerModalOpen, setColorPickerModalOpen] = useState(false);
	const [queue, setQueue] = useState(initialState);
	const greetingRef = useRef();
	

	
	

	useEffect(() => {
		
		(async () => {
			if (!queueId) return;
			try {
				const { data } = await api.get(`/queue/${queueId}`);
				setQueue(prevState => {
					return { ...prevState, ...data };
				});
			} catch (err) {
				toastError(err);
			}
		})();

		return () => {
			setQueue({
				name: "",
				color: "",
				greetingMessage: "",
			});
		};


	}, [queueId, open]);

	

	

	 
	const handleClose = () => {
		onClose();
		setQueue(initialState);
	};

	const handleSaveQueue = async values => {
		try {
			if (queueId) {
				await api.put(`/queue/${queueId}`, values);
			} else {
				await api.post("/queue", values);
			}
			toast.success("Queue saved successfully");
			handleClose();
		} catch (err) {
			toastError(err);
		}
	};

	const [activeStep, setActiveStep] = React.useState(100);
	const [subQueueName, setSubQueueName] = React.useState("");
	const [subQueueMsg, setSubQueueMgs] = React.useState("");
	const [subQueueQueue, setSubQueueQueue] = React.useState(100);
	const [subQueues, setSubQueues] = React.useState([]);
	const [fields, setFields] = React.useState();
	const [loadQueue, setLoadQueue] = useState();

	useEffect(() => {
		setActiveStep(100);
		(async () => {
			try {
			  const {data}  = await api.get("/queue");
			  setLoadQueue(data)
			} catch (err) {
			  toastError(err);
			}
		  })();	  
	}, [open, queueId]);


	useEffect(() => {
		(async () => {
			if(queueId){
				const {data}  = await api.get(`subQueues/${queueId}`);
				setSubQueues(data.data);
				setFields(data.data);	
			}
		})();
	}, [queueId]);
	
  
	const editQueue = (index) => {
	  if (subQueues[index]) {
		setActiveStep(index);;
		setSubQueueName(subQueues[index].subQueueName);
		setSubQueueMgs(subQueues[index].subQueueMsg);
		setSubQueueQueue(subQueues[index].subQueueQueue);
	  }
	};
  
	const addOptions = () => {
		if (fields.length === subQueues.length) {
		  setFields([...fields, { value: "" }]);
		  setActiveStep(subQueues.length);
		}
	  };
  
  
	const handleSave = async(index) => {
	  setActiveStep((prevActiveStep) => prevActiveStep + 100);
	  const data = {
		subQueueName: subQueueName,
		subQueueMsg: subQueueMsg,
		subQueueQueue: subQueueQueue,
		queueId: queueId
	  };
	  
	  const updatedSubQueues = [...subQueues];
	  updatedSubQueues[index] = data;

	  setSubQueues(updatedSubQueues );
  
	  setSubQueueName("");
	  setSubQueueMgs("");
	  setSubQueueQueue(0);

	  await api.post("/subQueues/" + queueId, updatedSubQueues);
  
	};
	const delQueue = async(index) => {
		
		const array = [...subQueues];;
		array.splice(index, 1);
		
		await api.post("/subQueues/" + queueId, array);
		
		setSubQueues(array);
		setFields(array);
		
		if (array.length == 0) {
			setActiveStep(0);
		}
		
	};

	return (
		<div className={classes.root}>
			<Dialog open={open} onClose={handleClose} scroll="paper">
				<DialogTitle>
					{queueId
						? `${i18n.t("queueModal.title.edit")}`
						: `${i18n.t("queueModal.title.add")}`}
				</DialogTitle>
				<Formik
					initialValues={queue}
					enableReinitialize={true}
					validationSchema={QueueSchema}
					onSubmit={(values, actions) => {
						setTimeout(() => {
							handleSaveQueue(values);
							actions.setSubmitting(false);
						}, 400);
					}}
				>
					{({ touched, errors, isSubmitting, values }) => (
						<Form>
							<DialogContent dividers>
								<Field
									as={TextField}
									label={i18n.t("queueModal.form.name")}
									autoFocus
									name="name"
									error={touched.name && Boolean(errors.name)}
									helperText={touched.name && errors.name}
									variant="outlined"
									margin="dense"
									className={classes.textField}
								/>
								<Field
									as={TextField}
									label={i18n.t("queueModal.form.color")}
									name="color"
									id="color"
									onFocus={() => {
										setColorPickerModalOpen(true);
										greetingRef.current.focus();
									}}
									error={touched.color && Boolean(errors.color)}
									helperText={touched.color && errors.color}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<div
													style={{ backgroundColor: values.color }}
													className={classes.colorAdorment}
												></div>
											</InputAdornment>
										),
										endAdornment: (
											<IconButton
												size="small"
												color="default"
												onClick={() => setColorPickerModalOpen(true)}
											>
												<Colorize />
											</IconButton>
										),
									}}
									variant="outlined"
									margin="dense"
								/>
								<ColorPicker
									open={colorPickerModalOpen}
									handleClose={() => setColorPickerModalOpen(false)}
									onChange={color => {
										values.color = color;
										setQueue(() => {
											return { ...values, color };
										});
									}}
								/>
								<div>
									<Field
										as={TextField}
										label={i18n.t("queueModal.form.greetingMessage")}
										type="greetingMessage"
										multiline
										inputRef={greetingRef}
										rows={5}
										fullWidth
										name="greetingMessage"
										error={
											touched.greetingMessage && Boolean(errors.greetingMessage)
										}
										helperText={
											touched.greetingMessage && errors.greetingMessage
										}
										variant="outlined"
										margin="dense"
									/>
								</div>
								<div>
								{queueId ? (
								<Stepper orientation="vertical" activeStep={activeStep} nonLinear>
									{fields &&
										fields.map((val, index) => (
										<Step key={index}>
											{activeStep == index ? (
											<StepLabel>
												<Input
												value={subQueueName}
												onChange={(e) => setSubQueueName(e.target.value)}
												sx={{ minWidth: '90%' }}
												/>
												<Button variant="text" onClick={() => handleSave(index)}>
												Save
												</Button>
											</StepLabel>
											) : (
											<StepLabel>
												{subQueues[index] ? subQueues[index].subQueueName : ""}
												{activeStep > 99 ? (
													 <>
													 <Button variant="text" onClick={() => editQueue(index)}>
													   Edit
													 </Button>
													 <Button variant="text" onClick={() => delQueue(index)}>
													   Del
													 </Button>
												   </>
													) : (
													""
													)}
											</StepLabel>
											)}
											<StepContent>
											<div>
												<label >Menssagem: </label>
												<Input

												value={subQueueMsg}
												onChange={(e) => setSubQueueMgs(e.target.value)}
												sx={{ m: 4, minWidth: '90%' }}
												/>
											</div>
											<div>
												<label>Enivar para fila: </label>
												<Select
													value={subQueueQueue}
													sx={{ m: 2, minWidth: '90%' }}
													onChange={(e) => setSubQueueQueue(e.target.value)}
												>
													<MenuItem value={100}>Não</MenuItem>
													{loadQueue.map((values, index) => (
														<MenuItem key={index} value={values.id}>{values.name}</MenuItem>
													))}
												</Select>
											</div>
											</StepContent>
										</Step>
										))}
									<Step>
										<StepLabel onClick={() => addOptions()}>Adiconar opções</StepLabel>
									</Step>
									</Stepper>
									
									): (<label>Salve para poder criar Sub Filas</label>)}	
								</div>

							</DialogContent>
							<DialogActions>
								<Button
									onClick={handleClose}
									color="secondary"
									disabled={isSubmitting}
									variant="outlined"
								>
									{i18n.t("queueModal.buttons.cancel")}
								</Button>
								<Button
									type="submit"
									color="primary"
									disabled={isSubmitting}
									variant="contained"
									className={classes.btnWrapper}
								>
									{queueId
										? `${i18n.t("queueModal.buttons.okEdit")}`
										: `${i18n.t("queueModal.buttons.okAdd")}`}
									{isSubmitting && (
										<CircularProgress
											size={24}
											className={classes.buttonProgress}
										/>
									)}
								</Button>
							</DialogActions>
							<Dialog>
							<TextField id="outlined-basic" label="Outlined" variant="outlined" />
							</Dialog>


						</Form>	
					)}
				</Formik>
				
			</Dialog>
								 

		</div>
	);
};

export default QueueModal;
