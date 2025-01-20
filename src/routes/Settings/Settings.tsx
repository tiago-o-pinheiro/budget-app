import {
  Avatar,
  Container,
  Icon,
  PageHeader,
  Section,
  SwitchButton,
  Text,
  Title,
} from "@components";

import { useThemeEffect } from "@hooks";
import { Link } from "react-router-dom";

const ThemeSetting = () => {
  const { theme, toggleTheme } = useThemeEffect();

  return (
    <Section styles="flex gap-2 w-full items-center border-b justify-between">
      <div className="w-1/12">
        <Icon name={theme === "dark" ? "moon" : "sun"} />
      </div>
      <div className="flex flex-col gap-1 w-10/12">
        <Text value="Dark mode" size="md" />
        <Text
          value="Switch theme from night mode or light mode"
          size="xs"
          color="secondary"
        />
      </div>
      <div className="w-1/12">
        <SwitchButton
          type="boolean"
          values={["light", "dark"]}
          handleClick={toggleTheme}
          defaultValue={theme === "dark"}
        />
      </div>
    </Section>
  );
};

const CategorySetting = () => {
  return (
    <Link to="/settings/categories">
      <Section styles="flex gap-2 w-full items-center border-b justify-between">
        <div className="w-1/12">
          <Icon name="queue-list" />
        </div>
        <div className="flex flex-col gap-1 justify-items-start w-10/12 self-start">
          <Text value="Categories" size="md" />
          <Text value="Add or remove categories" size="xs" color="secondary" />
        </div>
        <div className="w-1/12 flex justify-end">
          <Icon name="chevron-right" />
        </div>
      </Section>
    </Link>
  );
};

const LanguageSetting = () => {
  return (
    <Section styles="flex gap-2 w-full items-center border-b justify-between">
      <div className="w-1/12">
        <Icon name="language" />
      </div>
      <div className="flex flex-col gap-1 justify-items-start w-10/12 self-start">
        <Text value="Language" size="md" />
        <Text value="English" size="xs" color="secondary" />
      </div>
      <div className="w-1/12 flex justify-end">
        <Icon name="chevron-right" />
      </div>
    </Section>
  );
};

const ProfileSetting = () => {
  return (
    <Section styles="flex gap-2 w-full items-center border-b justify-between">
      <div className="w-1/12">
        <Icon name="user" />
      </div>
      <div className="flex flex-col gap-1 justify-items-start w-10/12 self-start">
        <Text value="Profile" size="md" />
        <Text
          value="Change user settings and configuration"
          size="xs"
          color="secondary"
        />
      </div>
      <div className="w-1/12 flex justify-end">
        <Icon name="chevron-right" />
      </div>
    </Section>
  );
};

export const SettingsScreen = () => {
  return (
    <Container>
      <PageHeader title="Settings" />
      <Section styles="flex flex-col justify-center items-center gap-2">
        <Avatar
          image="https://avatars.githubusercontent.com/u/64702589?v=4"
          value="avatar"
          size="xlarge"
        />
        <Title value="Tiago Oliver" size="lg" />
      </Section>
      <ThemeSetting />
      <CategorySetting />
      <LanguageSetting />
      <ProfileSetting />
    </Container>
  );
};

export const Settings = () => {
  return (
    <Container>
      <PageHeader title="Settings" />
      <Section styles="flex flex-col justify-center items-center gap-2">
        <Avatar
          image="https://avatars.githubusercontent.com/u/64702589?v=4"
          value="avatar"
          size="xlarge"
        />
        <Title value="Tiago Oliver" size="lg" />
      </Section>
      <ThemeSetting />
      <CategorySetting />
      <LanguageSetting />
      <ProfileSetting />
    </Container>
  );
};
