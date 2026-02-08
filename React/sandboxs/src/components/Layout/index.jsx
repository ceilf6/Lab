import React from 'react'

export default function Layout({ children }) {
  return <div>{children}</div>;
}

Layout.Header = function Header({ children }) {
  return <header>{children}</header>;
};

Layout.Footer = function Footer({ children }) {
  return <footer>{children}</footer>;
};