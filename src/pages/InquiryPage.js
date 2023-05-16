import { useState, useEffect } from "react";
import {
  TextField,
  MobileStepper,
  FormHelperText,
  FormControl,
  Button,
} from "@mui/material";
import { StyledBackButton } from "../components/StyledBackButton";
import { StyledMainButton } from "../components/StyledMainButton";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { isMailAddress, isNumber, isPhoneNumber } from "../utils/utils";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import theme from "../styles/theme";

function InquiryPage({ title }) {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [pathname]);

  const { kigaIndex } = state;

  const goBack = (e) => {
    e.preventDefault();
    navigate("/details", {
      state: {
        kigaIndex,
      },
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState(
    "Bitte Telefonnummer angeben!"
  );

  const [mailAddress, setMailAddress] = useState("");
  const [mailAddressError, setMailAddressError] = useState(false);
  const [mailAddressErrorMessage, setMailAddressErrorMessage] = useState(
    "Bitte E-Mail-Adresse angeben!"
  );

  const [childFirstName, setChildFirstName] = useState("");
  const [childFirstNameError, setChildFirstNameError] = useState(false);

  const [childLastName, setChildLastName] = useState("");
  const [childLastNameError, setChildLastNameError] = useState(false);

  const [childAge, setChildAge] = useState("");
  const [childAgeError, setChildAgeError] = useState(false);
  const [childAgeErrorMessage, setChildAgeErrorMessage] = useState(
    "Bitte Alter angeben!"
  );

  const sendInquiry = (e) => {
    e.preventDefault();
    setFirstNameError(firstName === "" ? true : false);
    setLastNameError(firstName === "" ? true : false);
    setPhoneNumberError(
      phoneNumber === "" || !isPhoneNumber(phoneNumber) ? true : false
    );
    phoneNumber !== "" &&
      !isPhoneNumber(phoneNumber) &&
      setPhoneNumberErrorMessage("Ungültiges Format!");
    setMailAddressError(
      mailAddress === "" || !isMailAddress(mailAddress) ? true : false
    );
    mailAddress !== "" &&
      !isMailAddress(mailAddress) &&
      setMailAddressErrorMessage("Ungültiges Format!");
    setChildFirstNameError(childFirstName === "" ? true : false);
    setChildLastNameError(childLastName === "" ? true : false);
    setChildAgeError(childAge === "" || !isNumber(childAge) ? true : false);
    childAge !== "" &&
      !isNumber(childAge) &&
      setChildAgeErrorMessage("Ungültiges Format!");

    if (
      firstName !== "" &&
      lastName !== "" &&
      phoneNumber !== "" &&
      isPhoneNumber(phoneNumber) &&
      mailAddress !== "" &&
      isMailAddress(mailAddress) &&
      childFirstName !== "" &&
      childLastName !== "" &&
      childAge !== "" &&
      isNumber(childAge)
    ) {
      // navigate("/success");
      setOpenSnackbar(true);
    }
  };

  const action = (
    <Button color="secondary" size="small" onClick={handleCloseSnackbar}>
      Close
    </Button>
  );

  return (
    <div className="container col">
      {/* <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={6000}
        // onClose={handleCloseSnackbar}
        // message="I love snacks"
        // action={action}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="info"
          sx={{
            width: "100%",
            backgroundColor: "#FF0000",
            color: "#FFF",
          }}
        >
          Snackbar Message
        </MuiAlert>
      </Snackbar> */}
      <ScrollToTopButton />
      <div className="headline-box col center">
        <MobileStepper
          variant="dots"
          steps={5}
          activeStep={3}
          position="static"
          backButton={null}
          nextButton={null}
          sx={{ marginBottom: "10px" }}
        />
        <h3 className="headline">Daten zu deiner Person:</h3>
      </div>
      <div className="input-box">
        <FormControl fullWidth sx={{ marginBottom: "15px" }}>
          <TextField
            required
            color="secondary"
            id="firstName"
            label="Vorname"
            variant="outlined"
            placeholder="Erika"
            onChange={(e) => setFirstName(e.target.value)}
            error={firstNameError}
          />
          {firstNameError ? (
            <FormHelperText sx={{ color: "red" }}>
              Bitte Vornamen angeben!
            </FormHelperText>
          ) : (
            ""
          )}
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: "15px" }}>
          <TextField
            fullWidth
            required
            color="secondary"
            id="lastName"
            label="Nachname"
            variant="outlined"
            placeholder="Musterfrau"
            onChange={(e) => setLastName(e.target.value)}
            error={lastNameError}
          />
          {lastNameError ? (
            <FormHelperText sx={{ color: "red" }}>
              Bitte Nachnamen angeben!
            </FormHelperText>
          ) : (
            ""
          )}
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: "15px" }}>
          <TextField
            fullWidth
            required
            color="secondary"
            id="phoneNumber"
            label="Telefonnummer"
            variant="outlined"
            placeholder="0664 12345678"
            onChange={(e) => setPhoneNumber(e.target.value)}
            error={phoneNumberError}
          />
          {phoneNumberError ? (
            <FormHelperText sx={{ color: "red" }}>
              {phoneNumberErrorMessage}
            </FormHelperText>
          ) : (
            ""
          )}
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: "15px" }}>
          <TextField
            fullWidth
            required
            color="secondary"
            id="mailAddress"
            label="E-Mail"
            variant="outlined"
            placeholder="erika.mustermann@mail.com"
            onChange={(e) => setMailAddress(e.target.value)}
            error={mailAddressError}
          />
          {mailAddressError ? (
            <FormHelperText sx={{ color: "red" }}>
              {mailAddressErrorMessage}
            </FormHelperText>
          ) : (
            ""
          )}
        </FormControl>
      </div>
      <div className="col center">
        <h3 className="bottomline">Daten zu deinem Kind:</h3>
      </div>
      <div className="input-box">
        <FormControl fullWidth sx={{ marginBottom: "15px" }}>
          <TextField
            fullWidth
            required
            color="secondary"
            id="childFirstName"
            label="Vorname"
            variant="outlined"
            placeholder="Max"
            onChange={(e) => setChildFirstName(e.target.value)}
            error={childFirstNameError}
          />
          {childFirstNameError ? (
            <FormHelperText sx={{ color: "red" }}>
              Bitte Vornamen angeben!
            </FormHelperText>
          ) : (
            ""
          )}
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: "15px" }}>
          <TextField
            fullWidth
            required
            color="secondary"
            id="childLastName"
            label="Nachname"
            variant="outlined"
            placeholder="Mustermann"
            onChange={(e) => setChildLastName(e.target.value)}
            error={childLastNameError}
          />
          {childLastNameError ? (
            <FormHelperText sx={{ color: "red" }}>
              Bitte Nachnamen angeben!
            </FormHelperText>
          ) : (
            ""
          )}
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: "15px" }}>
          <TextField
            fullWidth
            required
            color="secondary"
            id="childAge"
            label="Alter"
            variant="outlined"
            placeholder="3"
            onChange={(e) => setChildAge(e.target.value)}
            error={childAgeError}
          />
          {childAgeError ? (
            <FormHelperText sx={{ color: "red" }}>
              {isNumber(childAge)}
              {childAgeErrorMessage}
            </FormHelperText>
          ) : (
            ""
          )}
        </FormControl>
      </div>
      <div className="input-box">
        <TextField
          fullWidth
          color="secondary"
          rows={6}
          multiline
          placeholder="Verfasse hier deine Nachricht..."
        />
        <div className="col center">
          <StyledMainButton
            startIcon={<ArrowForward />}
            variant="contained"
            sx={{
              marginBottom: "25px",
            }}
            onClick={sendInquiry}
          >
            Anfrage absenden
          </StyledMainButton>

          <h3 className="bottomline">Nochmal Details checken?</h3>
          <StyledBackButton
            startIcon={<ArrowBack />}
            variant="contained"
            className="btn__start"
            sx={{
              width: 250,
              marginTop: "24px",
              marginBottom: "100px",
            }}
            onClick={goBack}
          >
            Zurück zu den Details
          </StyledBackButton>
        </div>
      </div>
    </div>
  );
}

export default InquiryPage;
