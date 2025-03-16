import { TextProps } from "@react-three/drei";

export interface Project {
  id?: string;
  title: string;
  component: React.ReactNode;
  color: string;
  active?: boolean;
  textAlign?: TextProps['textAlign'];
}