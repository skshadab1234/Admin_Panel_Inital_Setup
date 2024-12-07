import { Button, Popover, ActionList, Avatar, Divider, Modal, TextContainer, Spinner, Icon, Thumbnail } from '@shopify/polaris';
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

function Profile({ vendorData }: any) {
    const [popoverActive, setPopoverActive] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Function to extract initials from the vendor's name
    const getInitials = (name: string) => {
        if (!name) return '';
        return name
            .split(' ')
            .map((word: string) => word[0].toUpperCase())
            .join('');
    };

    const togglePopoverActive = useCallback(() => setPopoverActive((popoverActive) => !popoverActive), []);
    const toggleModalActive = useCallback(() => setModalActive((modalActive) => !modalActive), []);

    const initials = getInitials(vendorData?.name);

    const activator = (
        <button onClick={togglePopoverActive} className="flex items-center gap-2 px-2 text-xs text-white">
            <Avatar initials={initials} />
            <div className="hidden md:flex">
                <p className="text-black">{vendorData?.name}</p>
            </div>
        </button>
    );

    const handleLogout = () => {
        setLoading(true); // Start the loader

        setTimeout(() => {
            // Remove the specified cookie
            Cookies.remove('bappaSagartech');

            // Redirect to the admin login page after 1.5 seconds
            router.push('/admin-login');
        }, 1500);
    };

    return (
        <>
            <Popover active={popoverActive} activator={activator} autofocusTarget="first-node" onClose={togglePopoverActive}>
                <Popover.Pane>
                    <div className="mb-2 mt-3 px-3 md:w-56">
                        <h2 className="font-semibold">
                            ({vendorData?.id}) {vendorData?.name}
                        </h2>
                        <p className="text-xs text-gray-500">{vendorData?.email}</p>
                    </div>
                </Popover.Pane>

                <Popover.Pane>
                    <div className="py-2 px-3">
                        <Button fullWidth tone='critical' onClick={toggleModalActive}>
                            Logout
                        </Button>
                    </div>
                </Popover.Pane>
            </Popover>

            {/* Logout Confirmation Modal */}
            {modalActive && (
                <Modal
                    open={modalActive}
                    onClose={toggleModalActive}
                    title="Confirm Logout"
                    primaryAction={{
                        content: 'Logout',
                        destructive: true,
                        onAction: handleLogout,
                    }}
                    secondaryActions={[
                        {
                            content: 'Cancel',
                            onAction: toggleModalActive,
                        },
                    ]}
                >
                    <Modal.Section>
                        <TextContainer>
                            <p>Are you sure you want to log out?</p>
                            {loading && (
                                <div className="mt-4 flex justify-center">
                                    <Spinner size="small" />
                                </div>
                            )}
                        </TextContainer>
                    </Modal.Section>
                </Modal>
            )}
        </>
    );
}

export default Profile;
