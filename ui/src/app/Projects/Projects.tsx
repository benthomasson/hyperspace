import * as React from 'react';
import { PageSection, Title } from '@patternfly/react-core';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Ansi from "ansi-to-react";
import {
  Card,
  CardBody as PFCardBody,
  CardTitle,
  SimpleList as PFSimpleList,
  SimpleListItem,
  Stack,
  StackItem,
} from '@patternfly/react-core';
import { Button } from '@patternfly/react-core';
import PlusCircleIcon from '@patternfly/react-icons/dist/esm/icons/plus-circle-icon';
import styled from 'styled-components';
import {getServer} from '@app/utils/utils';


const CardBody = styled(PFCardBody)`
  white-space: pre-wrap;
  `
const SimpleList = styled(PFSimpleList)`
  white-space: pre-wrap;
`

const endpoint = 'http://' + getServer() + '/api/projects/';

const Projects: React.FunctionComponent = () => {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
     fetch(endpoint, {
       headers: {
         'Content-Type': 'application/json',
       },
     }).then(response => response.json())
    .then(data => setProjects(data));
  }, []);

  return (
  <React.Fragment>
  <PageSection>
    <Title headingLevel="h1" size="lg">Event Driven Automation | Projects</Title>
  </PageSection>

  <Link to="/new-project">
  <Button variant="link" icon={<PlusCircleIcon />}>
      New Project
  </Button>
  </Link>
	<Stack>
            <StackItem>
              <Card>
                <CardTitle>Projects</CardTitle>
                <CardBody>
                  {projects.length !== 0 && (
                    <SimpleList style={{ whiteSpace: 'pre-wrap' }}>
                      {projects.map((item, i) => (
                        <SimpleListItem key={i}><Link to={"/project/" + item.id}>{item.url} </Link></SimpleListItem>
                      ))}
                    </SimpleList>
                  )}
                </CardBody>
              </Card>
            </StackItem>
	</Stack>
  </React.Fragment>
)
}

export { Projects };
