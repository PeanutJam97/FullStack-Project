import { Button, Stack } from "react-bootstrap";




const ChangeEmailPass = () => {
    return ( 
        <Stack gap={2} className="col-md-5 mx-auto">
            <Button className="mt-5" variant="warning" size="lg" href="changeemail">
                Change Email
            </Button>
            <Button className="mt-2" variant="dark" size="lg" href="changepassword">
                Change Password
            </Button>
        </Stack>
    );
}
 
export default ChangeEmailPass;