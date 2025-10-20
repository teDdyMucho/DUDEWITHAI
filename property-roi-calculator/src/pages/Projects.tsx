import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Plus, FileText, Download, Share2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Projects: React.FC = () => {
  const navigate = useNavigate();
  
  const projects = [
    {
      id: 1,
      name: '123 Main Street',
      address: 'San Francisco, CA 94105',
      status: 'completed',
      roi: 8.5,
      investment: 450000,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
    },
    {
      id: 2,
      name: '456 Oak Avenue',
      address: 'Los Angeles, CA 90001',
      status: 'draft',
      roi: null,
      investment: 325000,
      createdAt: '2024-01-18',
      updatedAt: '2024-01-18',
    },
    {
      id: 3,
      name: '789 Pine Road',
      address: 'San Diego, CA 92101',
      status: 'completed',
      roi: 12.3,
      investment: 580000,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-montserrat font-bold">Projects</h1>
        <Button 
          onClick={() => navigate('/calculator')}
          className="gradient-primary text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Analysis
        </Button>
      </div>
      
      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="card-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{project.name}</CardTitle>
                  <CardDescription>{project.address}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'completed' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {project.status === 'completed' ? 'Completed' : 'Draft'}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Investment</p>
                  <p className="text-lg font-semibold">
                    ${project.investment.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ROI</p>
                  <p className="text-lg font-semibold">
                    {project.roi ? `${project.roi}%` : 'Pending'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="text-lg font-semibold">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Updated</p>
                  <p className="text-lg font-semibold">
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
