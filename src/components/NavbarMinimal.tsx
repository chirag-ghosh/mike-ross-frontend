import { useEffect, useState } from 'react';
import { Navbar, Tooltip, UnstyledButton, createStyles, Stack } from '@mantine/core';
import {
  TablerIcon,
  IconHome2,
  IconDeviceDesktopAnalytics,
  IconCalendarStats,
  IconSwitchHorizontal,
} from '@tabler/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useThemeContext } from '../hooks/useThemeContext';

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Home' },
  // { icon: IconSearch, label: 'Search' },
  { icon: IconCalendarStats, label: 'Schedule' },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
];

export function NavbarMinimal() {
  const [active, setActive] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const {toggleColorMode} = useThemeContext();

  useEffect(() => {
    const initRoute = location.pathname.split('/')[1]
    if(initRoute === '') {
      setActive(0)
      return
    }
    mockdata.forEach((links, index) => {
      if(links.label.toLowerCase() === initRoute) setActive(index)
    })
  }, [location.pathname])

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => navigate(`/${link.label.toLowerCase()}`)}
    />
  ));

  return (
    <Navbar width={{ base: 80 }} p="md">
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconSwitchHorizontal} label="Change theme" onClick={toggleColorMode} />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}